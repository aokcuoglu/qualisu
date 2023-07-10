'use client'

import * as React from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CalendarIcon, Check, ChevronsUpDown, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Model, Vehicle, Group } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { AlertModal } from '@/components/modals/alert-modal'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import {
  Form,
  FormControl,
  FormDescription,
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
import { status } from '@/lib/data'
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = z.object({
  name: z.string().min(1),
  shortCode: z.string().min(1).max(2),
  shortVin: z.string().min(1).max(11),
  status: z.string().min(1),
  modelId: z.string().min(1)
})

type SubModelFormValues = z.infer<typeof formSchema>

interface SubModelFormProps {
  initialData: Vehicle | null
  models: Model[]
}

export const SubModelForm: React.FC<SubModelFormProps> = ({
  initialData,
  models
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit vehicle' : 'Create vehicles'
  const description = initialData ? 'Edit a vehicle.' : 'Add a new vehicle'
  const toastMessage = initialData ? 'Vehicle updated.' : 'Vehicle created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<SubModelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      shortVin: '',
      shortCode: '',
      status: '',
      modelId: ''
    }
  })

  const onSubmit = async (data: SubModelFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/vehicles/${params.vehicleId}`, data)
      } else {
        await axios.post(`/api/vehicles/`, data)
      }
      router.refresh()
      router.push(`/parameters/vehicles`)
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
      await axios.delete(`/api/vehicles/${params.vehicleId}`)
      router.refresh()
      router.push(`/parameters/vehicles`)
      toast.success('Vehicle deleted.')
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Vehicle name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelId"
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
                      <ScrollArea className="h-96 w-full">
                        {models.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Short Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortVin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short VIN</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Short VIN"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
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
                          placeholder="Select a status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.map((item) => (
                        <SelectItem key={item.id} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
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
