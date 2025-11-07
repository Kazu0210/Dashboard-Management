import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Register" />
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="border-none shadow-xl bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20">
                    <CardHeader className="text-center space-y-4 pb-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <UserPlus className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Create Account
                            </CardTitle>
                            <CardDescription className="text-gray-500 mt-2">
                                Enter your details below to create your account
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="space-y-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Enter your full name"
                                            className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm hover:border-gray-300 transition-colors duration-200"
                                        />
                                        <InputError message={errors.name} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm hover:border-gray-300 transition-colors duration-200"
                                        />
                                        <InputError message={errors.email} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Create a strong password"
                                            className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm hover:border-gray-300 transition-colors duration-200"
                                        />
                                        <InputError message={errors.password} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Confirm your password"
                                            className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm hover:border-gray-300 transition-colors duration-200"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                        className="pt-2"
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                            tabIndex={5}
                                            disabled={processing}
                                            data-test="register-user-button"
                                        >
                                            {processing && <Spinner className="mr-2" />}
                                            {processing ? 'Creating Account...' : 'Create Account'}
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                        className="text-center"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-gray-200" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-white text-gray-500">
                                                    Already have an account?
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <TextLink 
                                                href={login()} 
                                                tabIndex={6}
                                                className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium text-sm transition-all duration-200 hover:gap-3"
                                            >
                                                <Lock className="w-4 h-4" />
                                                Sign in instead
                                            </TextLink>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
