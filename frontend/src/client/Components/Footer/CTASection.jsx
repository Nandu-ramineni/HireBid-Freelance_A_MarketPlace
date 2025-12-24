import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-300 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 border border-white/30">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Join 50,000+ professionals</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl text-white/90 mb-10">
            Whether you're looking to hire or get hired, HireBid is the platform that connects talent with opportunity.
            Start today, for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto group bg-white text-blue-600 hover:bg-white/90">
                Create Free Account
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
