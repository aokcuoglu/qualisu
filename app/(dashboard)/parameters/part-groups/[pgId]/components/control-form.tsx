'use client'

import * as React from 'react'
import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CheckIcon, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { PartGroup, PartTeam } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'

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
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

const formSchema = z.object({
  code: z.string().min(1).max(3),
  name: z.string().min(1),
  status: z.string().min(1),
  partTeamSlug: z.string().min(1)
})

type FailureSourceFormValues = z.infer<typeof formSchema>

interface FailureSourceFormProps {
  initialData: PartGroup | null
  partTeams: PartTeam[]
}

export const ControlForm: React.FC<FailureSourceFormProps> = ({
  initialData,
  partTeams
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit part group' : 'Create part group'
  const description = initialData
    ? 'Edit a part group.'
    : 'Add a new part group'
  const toastMessage = initialData
    ? 'Part group updated.'
    : 'Part group created.'
  const action = initialData ? 'Save changes' : 'Create'
  const cancel = 'Cancel'

  const defaultValues = initialData
    ? initialData
    : { name: '', status: '', code: '', partTeamSlug: '' }

  const form = useForm<FailureSourceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (data: FailureSourceFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/part-groups/${params.pgId}`, data)
      } else {
        await axios.post(`/api/part-groups/`, data)
      }
      router.refresh()
      router.push(`/parameters/part-groups`)
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
      await axios.delete(`/api/part-groups/${params.pgId}`)
      router.refresh()
      router.push(`/parameters/part-groups`)
      toast.success('Part group deleted.')
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
          <div className="md:grid md:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. 010, 023 "
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. Aku Grubu, Aydinlatma "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="partTeamSlug"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Part Team</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? partTeams.find(
                                (partTeam) => partTeam.slug === field.value
                              )?.name
                            : 'e.g. Govde, Ic Trim'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-48 w-full">
                            {partTeams.map((partTeam) => (
                              <CommandItem
                                value={partTeam.slug}
                                key={partTeam.id}
                                onSelect={(value) => {
                                  form.setValue('partTeamSlug', value)
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    partTeam.slug === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {partTeam.name}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
          <div className="justify-between space-x-2">
            <Button
              disabled={loading}
              variant="ghost"
              onClick={() => router.back()}
            >
              {cancel}
            </Button>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
