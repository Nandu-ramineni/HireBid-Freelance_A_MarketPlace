
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, AlertTriangle, Key, Users, Activity } from "lucide-react"

export function SecuritySettings() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Security Center</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor security settings, manage access controls, and review security logs.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Activity className="mr-2 h-4 w-4" />
                        Security Logs
                    </Button>
                    <Button>
                        <Shield className="mr-2 h-4 w-4" />
                        Run Security Scan
                    </Button>
                </div>
            </div>

            {/* Security Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                        <Shield className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">95/100</div>
                        <p className="text-xs text-muted-foreground">Excellent security posture</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-muted-foreground">Current active sessions</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">Last 24 hours</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
                        <Key className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-xs text-muted-foreground">Of all users</p>
                    </CardContent>
                </Card>
            </div>

            {/* Security Settings */}
            <Tabs defaultValue="authentication" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="authentication">Authentication</TabsTrigger>
                    <TabsTrigger value="access">Access Control</TabsTrigger>
                    <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                    <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>

                <TabsContent value="authentication" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Authentication Settings</CardTitle>
                            <CardDescription>Configure authentication methods and security requirements</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Two-Factor Authentication</Label>
                                    <div className="text-sm text-muted-foreground">Require 2FA for all admin accounts</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Password Requirements</Label>
                                    <div className="text-sm text-muted-foreground">Enforce strong password policies</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Session Timeout</Label>
                                    <div className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Login Attempt Limits</Label>
                                    <div className="text-sm text-muted-foreground">Lock accounts after 5 failed attempts</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="access" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Access Control</CardTitle>
                            <CardDescription>Manage user permissions and access levels</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Role-Based Access Control</Label>
                                    <div className="text-sm text-muted-foreground">Enable RBAC for granular permissions</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">IP Whitelisting</Label>
                                    <div className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">API Rate Limiting</Label>
                                    <div className="text-sm text-muted-foreground">Limit API requests per user/IP</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Monitoring</CardTitle>
                            <CardDescription>Configure security monitoring and alerting</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Real-time Alerts</Label>
                                    <div className="text-sm text-muted-foreground">Get notified of suspicious activities</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Login Monitoring</Label>
                                    <div className="text-sm text-muted-foreground">Track all login attempts and locations</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Data Access Logging</Label>
                                    <div className="text-sm text-muted-foreground">Log all data access and modifications</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="policies" className="space-y-6">
                    <div className="text-center py-12">
                        <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Security Policies</h3>
                        <p className="text-muted-foreground mb-4">Configure and manage security policies</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
