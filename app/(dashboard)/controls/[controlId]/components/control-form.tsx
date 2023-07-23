'use client'

import * as React from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ControlPoints, Controls, Vehicle } from '@prisma/client'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = z.object({
  shortCode: z.string().min(1),
  status: z.string().min(1),
  controlPointsId: z.string().min(1)
})

type ControlFormValues = z.infer<typeof formSchema>

interface ControlFormProps {
  initialData: Controls | null
  cPoints: ControlPoints[]
}

export const ControlForm: React.FC<ControlFormProps> = ({
  initialData,
  cPoints
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit control' : 'Create control'
  const description = initialData ? 'Edit a control.' : 'Add a new control'
  const toastMessage = initialData ? 'Control updated.' : 'Control created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<ControlFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      shortCode: '',
      status: 'continue',
      controlPointsId: ''
    }
  })

  const onSubmit = async (data: ControlFormValues) => {
    try {
      setLoading(true)
      console.log(data)
      if (initialData) {
        await axios.patch(`/api/controls/${params.controlId}`, data)
      } else {
        await axios.post(`/api/controls/`, data)
      }
      router.refresh()
      router.push(`/controls`)
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
      await axios.delete(`/api/controls/${params.controlId}`)
      router.refresh()
      router.push(`/controls`)
      toast.success('Control deleted.')
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
          <div className="md:grid md:grid-rows-2 gap-8 w-1/4">
            <FormField
              control={form.control}
              name="shortCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. 2N, N2 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="controlPointsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Control Point</FormLabel>
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
                          placeholder="Select a control point"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-fit w-full">
                        {cPoints.map((cPoint) => (
                          <SelectItem key={cPoint.id} value={cPoint.id}>
                            {cPoint.name}
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
