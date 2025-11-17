import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Award, DollarSign, Heart, Shield } from "lucide-react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import avatar from '../../../assets/avatar.png'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
const services = [
    {
        image: "https://img.freepik.com/premium-photo/expert-solutions-fullstack-mobile-ecommerce-development_1245763-69342.jpg?w=740",
        category: "Development & IT",
        title: "Management software to help you manage your mobile workers",
        rating: 4.5,
        reviews: 2,
        provider: {
            name: "Ali Tufan",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        price: 89,
    },
    {
        image: "https://img.freepik.com/free-vector/banking-app-interface-concept_23-2148584490.jpg?t=st=1728494458~exp=1728498058~hmac=c3ded706e7a6035fc94e26e524bb8afb1207675479f0f1dc3b33999c89088c86&w=1060",
        category: "Design & Creative",
        title: "Embedded Android & AOSP customizations on app mobile",
        rating: 4.0,
        reviews: 1,
        provider: {
            name: "Robert Fox",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        price: 59,
    },
    {
        image: "https://img.freepik.com/free-photo/representations-user-experience-interface-design_23-2150038909.jpg?t=st=1728495086~exp=1728498686~hmac=e3b2329408d444fd9d807e4b4e2cda2d4732572b1d26ba730d8516153f332ef2&w=1060",
        category: "Design & Creative",
        title: "Custom iOS and Android apps development for your project",
        rating: 3.0,
        reviews: 1,
        provider: {
            name: "Tom Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        price: 85,
    },
    {
        image: "https://img.freepik.com/free-vector/portrait-programmer-working-with-pc_23-2148222500.jpg?t=st=1728494945~exp=1728498545~hmac=6f4278eb47a5825efa87c85cfc8b4e681ea887b5bf40cf7281a11bfa6618407d&w=740",
        category: "Development & IT",
        title: "Web development, with HTML, CSS, JavaScript and Node",
        rating: 4.5,
        reviews: 2,
        provider: {
            name: "Agent Pakulla",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        price: 69,
    },
];

const TrendingServices = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };
    const features = [
        {
            icon: <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            title: "Proof of quality",
            description: "Verify any freelancer's work samples, client reviews, and blockchain-based identity.",
            delay: 0.2,
        },
        {
            icon: <DollarSign className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            title: "No cost until you hire",
            description: "Browse and interact with freelancers at no cost. Pay only when you decide to hire.",
            delay: 0.3,
        },
        {
            icon: <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            title: "Safe and secure",
            description: "Our smart contracts ensure secure transactions and protect both clients and freelancers.",
            delay: 0.4,
        },
    ]

    const CustomLeftArrow = ({ onClick }) => (
        <button onClick={onClick} className="absolute top-1/2 left-4 p-2 bg-white rounded-xl transform -translate-y-1/2 shadow">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
    );

    const CustomRightArrow = ({ onClick }) => (
        <button onClick={onClick} className="absolute top-1/2 right-4 p-2 bg-white rounded-xl transform -translate-y-1/2 shadow">
            <ArrowRight className="h-5 w-5 text-gray-500" />
        </button>
    );

    return (
        <section >
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold mb-2 md:text-3xl">Trending Services</h2>
                        <p className="text-xs text-muted-foreground md:text-lg">Most viewed and all-time top-selling services</p>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                        All Services →
                    </a>
                </div>

                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    removeArrowOnDeviceType={["tablet"]}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                >
                    {services.map((service, index) => (
                        <div key={index} className="px-2">
                            <Card className="overflow-hidden h-full">
                                <CardHeader className="p-0">
                                    <div className="relative">
                                        <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />
                                        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                                            <Heart className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 ">
                                    <Badge variant="secondary" className="mb-2">
                                        {service.category}
                                    </Badge>
                                    <h3 className="font-semibold mb-2">{service.title}</h3>
                                    <div className="flex items-center mb-2 ">
                                        <span className="text-yellow-400 mr-1">★</span>
                                        <span className="font-medium mr-1">{service.rating.toFixed(1)}</span>
                                        <span className="text-muted-foreground">({service.reviews} Review{service.reviews !== 1 ? 's' : ''})</span>
                                    </div>
                                </CardContent>
                                <div className="flex justify-center items-center pb-4">
                                    <span className="w-[90%] border-t" />
                                </div>
                                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Avatar className="w-8 h-8 mr-2">
                                            <AvatarImage src={service.provider.avatar} alt={service.provider.name} />
                                            <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{service.provider.name}</span>
                                    </div>
                                    <div className="text-sm">
                                        Starting at: <span className="font-semibold">${service.price}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2  md:mb-0">
                    <img
                        src="https://img.freepik.com/free-photo/business-man-talking-online-videocall-meeting-with-webcam-using-remote-teleconference-chat-meet-with-colleagues-internet-chatting-videoconference-call-laptop-telework_482257-47600.jpg?t=st=1728542800~exp=1728546400~hmac=8b3bfd46eb614792ee903a0598bc284c370bc608b2b660fd9160f6da21864759&w=1380"
                        alt="Freelancer working on a project"
                        className="rounded-lg shadow-lg w-3/4 h-auto m-auto"
                    />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <h2 className="text-lg font-semibold text-[#40916c] mb-2">For clients and freelancers</h2>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Decentralized talent marketplace
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        Connect with a global network of professionals on a secure, blockchain-powered platform. From quick gigs to major projects, revolutionize the way you work.
                    </p>
                    <Button size="lg"  >
                        <p className="flex justify-center items-center gap-2 text-lg">Get Started <MoveUpRight className="h-5 w-5" /></p>
                    </Button>
                </div>
            </div> */}
            <section className="w-full py-16 md:py-24 overflow-hidden relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left side - Image */}
                        <motion.div
                            className="md:w-1/2 relative"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                {/* Main image */}
                                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent mix-blend-overlay z-10" />
                                    <img
                                        src="https://img.freepik.com/free-photo/group-businesspeople-working-laptop-office_23-2147838544.jpg?t=st=1744045481~exp=1744049081~hmac=c70cd642f72d391b2b34f16c62aca84fb314c5190fc29b8ffcf2a2752708aa10&w=826"
                                        alt="Freelancers collaborating"
                                        className="w-full h-auto md:h-[600px] rounded-2xl"
                                    />
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 left-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-70 blur-xl" />
                                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-70 blur-xl" />

                                {/* Floating card */}
                                <motion.div
                                    className="absolute -bottom-8 right-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    animate={{
                                        y: [0, -10, 0],
                                        transition: {
                                            duration: 4,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: "reverse",
                                        },
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">Secure Payments</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Protected by smart contracts</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right side - Content */}
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-6">
                                <div>
                                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 mb-4">
                                        <span className="text-sm font-medium text-emerald-800">Decentralized talent</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-6">
                                        A whole world of decentralized freelance talent at your fingertips
                                    </h2>
                                </div>

                                <div className="space-y-8">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start gap-4 group"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: feature.delay }}
                                            viewport={{ once: true }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className="relative">
                                                <div className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white">
                                                    {feature.icon}
                                                </div>
                                                <div className="absolute -inset-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                    viewport={{ once: true }}
                                    className="pt-6"
                                >
                                    <Button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-full shadow-lg text-white font-medium text-base transition-all duration-300 hover:shadow-emerald-200/50 hover:shadow-xl px-6 py-6">
                                        <span>Find Talent Now</span>
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default TrendingServices;
