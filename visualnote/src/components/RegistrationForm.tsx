import React from 'react';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegistrationFormProps = {};

export function RegistrationForm(props: RegistrationFormProps): JSX.Element {
 return (
  <Card className="mx-auto max-w-sm">
   <CardHeader>
    <CardTitle className="text-xl">Sign Up</CardTitle>
    <CardDescription>
     Enter your information to create an account
    </CardDescription>
   </CardHeader>
   <CardContent>
    <div className="grid gap-4">
     <div className="">
      <div className="grid gap-2 w-full">
       <Label htmlFor="full-name">full name</Label>
       <Input id="full-name" placeholder="Max" required />
      </div>
     </div>
     <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required />
     </div>
     <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" />
     </div>
     <Button type="submit" className="w-full">
      Create an account
     </Button>
     <Button variant="outline" className="w-full">
      Sign up with GitHub
     </Button>
    </div>
    <div className="mt-4 text-center text-sm">
     Already have an account?{' '}
     <a href="#" className="underline">
      Sign in
     </a>
    </div>
   </CardContent>
  </Card>
 );
}

export default RegistrationForm;
