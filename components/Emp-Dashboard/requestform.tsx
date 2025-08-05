"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// 1. Define your form schema using zod for validation.
// This schema ensures the data is in the correct format before submission.
const formSchema = z.object({
  requestType: z.enum(["general", "hr", "it", "other"]),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }).max(50, {
    message: "Subject must not be longer than 50 characters.",
  }),
  message: z.string().min(10, {
    message: "The message must be at least 10 characters.",
  }).max(500, {
    message: "The message must not be longer than 500 characters.",
  }),
})

// Define the type for the form data from the schema.
type FormValues = z.infer<typeof formSchema>

// 2. Define the main component.
export default function EmployeeRequestForm() {
  // 3. Initialize the form with react-hook-form.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  // 4. Define a submit handler.
  function onSubmit(data: FormValues) {
    // This is where you would typically send the data to a server.
    // For this example, we will just log it to the console.
    console.log("Form submitted with data:", data)
    
    // You could also add a toast notification here to show success.
    // For example: toast({ title: "Request Submitted!", description: "Your request has been sent to the manager." })
    
    // Reset the form after submission.
    form.reset();
  }

  // 5. Render the form using the shadcn/ui components.
  return (
    <div className="flex justify-center items-center p-8 bg-gray-50 min-w-7xl">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Employee Request Form</CardTitle>
          <CardDescription className="text-center">
            Submit your queries or requests to the company manager.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Request Type Field */}
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a request type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Query</SelectItem>
                        <SelectItem value="hr">HR Request</SelectItem>
                        <SelectItem value="it">IT Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Categorize your request for a faster response.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subject Field */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Query about my payslip" {...field} />
                    </FormControl>
                    <FormDescription>
                      A brief and clear title for your request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please write your detailed request here..."
                        className="resize-y min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide all necessary details for your request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
