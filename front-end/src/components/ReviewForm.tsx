import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormMessage, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { toast } from "@/components/ui/use-toast";
import { review } from "../types";

const formSchema = review.omit({ id: true, creationDate: true });

export type ReviewModel = z.infer<typeof formSchema>;

type ReviewFormProps = {
  onSubmit: (data: ReviewModel) => void;
};

export const ReviewForm: FC<ReviewFormProps> = ({ onSubmit }) => {
  const form = useForm<ReviewModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      author: {
        name: "",
        email: "",
      },
    },
  });

  const onSubmitClicked:SubmitHandler<ReviewModel> = (data) => {
    onSubmit(data);
    toast({
        title: 'Review Successfuly Added',
        description: `${data.comment}`
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitClicked)} className="py-4">
        <h3 className="font-semibold text-2xl mb-4">Leave a Review</h3>
        <p className="mb-8 text-slate-500">
          Your email adress will not be published. Required fields are marked *
        </p>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Comment *"
                  {...field}
                  className="rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 my-4">
          <FormField
            control={form.control}
            name="author.name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input
                    placeholder="Name *"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author.email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input
                    placeholder="Email *"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="author.phone"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input
                  placeholder="Phone (optional)"
                  {...field}
                  className="rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author.isSaveToCookie"
          render={({ field }) => (
            <FormItem className="flex space-x-3 space-y-0 mb-6">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="rounded-none"
                />
              </FormControl>
              <Label className="text-slate-400 font-normal">
                Save my name, email and website in this browser for the next
                time I comment.
              </Label>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full bg-teal-800 px-12 py-6 uppercase"
        >
          Post Review
        </Button>
      </form>
    </Form>
  );
};
