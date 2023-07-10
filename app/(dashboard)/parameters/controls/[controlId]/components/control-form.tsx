'use client'

import * as React from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Control, Group } from '@prisma/client'
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
import { status } from '@/lib/data'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  name: z.string().min(1),
  status: z.string().min(1),
  groups: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.'
  })
})

type ControlFormValues = z.infer<typeof formSchema>

interface ControlFormProps {
  initialData: (Control & { groups: Group[] }) | null
  groups: Group[]
}

export const ControlForm: React.FC<ControlFormProps> = ({
  initialData,
  groups
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit control' : 'Create control'
  const description = initialData ? 'Edit a control.' : 'Add a new control'
  const toastMessage = initialData ? 'Control updated.' : 'Control created.'
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? {
        ...initialData,
        groups: initialData.groups.map((item: any) => item.id)
      }
    : { name: '', status: '', groups: [] }

  const form = useForm<ControlFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (data: ControlFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/controls/${params.controlId}`, data)
      } else {
        await axios.post(`/api/controls/`, data)
      }
      router.refresh()
      router.push(`/parameters/controls`)
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
      router.push(`/parameters/controls`)
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Control Point</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Control point"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groups"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Groups</FormLabel>
                  </div>
                  {groups.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="groups"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
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
