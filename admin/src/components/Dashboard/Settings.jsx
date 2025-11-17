"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Bell, Shield, Database } from "lucide-react"

export function SystemSettings() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">System Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Configure platform settings, preferences, and system-wide options.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Basic platform configuration and preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="platform-name">Platform Name</Label>
                                    <Input id="platform-name" defaultValue="HireBid" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="platform-url">Platform URL</Label>
                                    <Input id="platform-url" defaultValue="https://hirebid.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="platform-description">Platform Description</Label>
                                <Input id="platform-description" defaultValue="Professional freelancing platform" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Default Timezone</Label>
                                    <Select defaultValue="utc">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC</SelectItem>
                                            <SelectItem value="est">Eastern Time</SelectItem>
                                            <SelectItem value="pst">Pacific Time</SelectItem>
                                            <SelectItem value="gmt">GMT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Default Currency</Label>
                                    <Select defaultValue="usd">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">USD ($)</SelectItem>
                                            <SelectItem value="eur">EUR (€)</SelectItem>
                                            <SelectItem value="gbp">GBP (£)</SelectItem>
                                            <SelectItem value="cad">CAD (C$)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Maintenance Mode</Label>
                                    <div className="text-sm text-muted-foreground">Enable maintenance mode for system updates</div>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>Customize the look and feel of the platform</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Default Theme</Label>
                                <Select defaultValue="light">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="primary-color">Primary Color</Label>
                                <div className="flex gap-2">
                                    <Input id="primary-color" defaultValue="#3b82f6" className="w-20" />
                                    <div className="w-10 h-10 rounded border bg-blue-500"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Compact Mode</Label>
                                    <div className="text-sm text-muted-foreground">Use compact layout for better space utilization</div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Animations</Label>
                                    <div className="text-sm text-muted-foreground">Enable smooth animations and transitions</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
                        <p className="text-muted-foreground mb-4">Configure system-wide notification preferences</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-6">
                    <div className="text-center py-12">
                        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Email Settings</h3>
                        <p className="text-muted-foreground mb-4">Configure SMTP settings and email templates</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <div className="text-center py-12">
                        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
                        <p className="text-muted-foreground mb-4">Advanced security configuration options</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                    <div className="text-center py-12">
                        <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Advanced Settings</h3>
                        <p className="text-muted-foreground mb-4">Advanced system configuration and developer options</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
