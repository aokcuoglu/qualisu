'use client'

import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { VehicleType } from '@prisma/client'
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

const formSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1)
})

type GroupFormValues = z.infer<typeof formSchema>

interface GroupFormProps {
  initialData: VehicleType | null
}

export const GroupForm: React.FC<GroupFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit a product.' : 'Add a new product'
  const toastMessage = initialData ? 'Product updated.' : 'Product created.'
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? { ...initialData }
    : { name: '', image: '' }

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      image: ''
    }
  })

  const onSubmit = async (data: GroupFormValues) => {
    console.log(data)
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/groups/${params.groupId}`, data)
      } else {
        await axios.post(`/api/groups/`, data)
      }
      router.refresh()
      router.push(`/parameters/groups`)
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
      await axios.delete(`/api/groups/${params.groupId}`)
      router.refresh()
      router.push(`/parameters/groups`)
      toast.success('Group deleted.')
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Group name"
                      {...field}
                    />
                  </FormControl>
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
