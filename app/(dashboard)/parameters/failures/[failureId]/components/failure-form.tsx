'use client'

import * as React from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { PartGroup, Failure } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { AlertModal } from '@/components/modals/alert-modal'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ImageUpload from '@/components/ui/image-upload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { status } from '@/lib/data'
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = z.object({
  code: z.string().min(1).max(6),
  name: z.string().min(1),
  partGroupId: z.string().min(1)
})

type FailureFormValues = z.infer<typeof formSchema>

interface FailureFormProps {
  initialData: Failure | null
  partGroups: PartGroup[]
}

export const FailureForm: React.FC<FailureFormProps> = ({
  initialData,
  partGroups
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit failure' : 'Create failure'
  const description = initialData ? 'Edit a failure' : 'Add a new failure'
  const toastMessage = initialData ? 'Failure updated.' : 'Failure created.'
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? initialData
    : { code: '', name: '', partGroupId: '' }

  const form = useForm<FailureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (data: FailureFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/failures/${params.failureId}`, data)
      } else {
        await axios.post(`/api/failures/`, data)
      }
      router.refresh()
      router.push(`/parameters/failures`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/failures/${params.failureId}`)
      router.refresh()
      router.push(`/parameters/failures`)
      toast.success('Failure deleted.')
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Failure Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. 090001"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Failure Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. Aku"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="partGroupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Group</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a group"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-48 w-full">
                        {partGroups.map((partGroup) => (
                          <SelectItem key={partGroup.id} value={partGroup.id}>
                            {partGroup.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
