

import { getJobs } from "@/client/Redux/Actions/jobActions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Briefcase,
  ChevronDown,
  Clock,
  DollarSign,
  Filter,
  Globe,
  Search,
  Sliders,
  Star,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Web from '@/assets/Images/Web.png'
import Design from '@/assets/Images/Design.png'
import Cloud from '@/assets/Images/Cloud.png'
import Marketing from '@/assets/Images/Market.png'
import Video from '@/assets/Images/Video.png'
import Data from '@/assets/Images/Data.png'
import { ArrowRight01Icon, Calendar01Icon, Calendar03Icon } from "hugeicons-react"
import { useNavigate } from "react-router-dom"
// Sample data for filters
const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "UI/UX",
  "Graphic Design",
  "Content Writing",
  "SEO",
  "Social Media",
  "Video Production",
  "Data Science",
  "WordPress",
  "Shopify",
  "Mobile Development",
  "Illustration",
  "Animation",
  "SQL"
]


const popularCategories = [
  { name: "Web Development", image: Web },
  { name: "Design", image: Design },
  { name: "Cloud Services", image: Cloud },
  { name: "Marketing", image: Marketing },
  { name: "Video Editing", image: Video },
  { name: "Data Analysis", image: Data },
]

export default function Jobs() {
  const dispatch = useDispatch()
  const { jobs, loading, error } = useSelector((state) => state.getJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState([])
  const [budgetRange, setBudgetRange] = useState([500, 5000])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const navigate = useNavigate()
  const placeholders = [
    "Search by Gig title...",
    "Search by Gig skills...",
    "Search by Gig category...",
    "Search by Gig keywords...",
    "Search by Gig budget...",
  ]
  const tagStyles = [
    {
      text: { light: "#5925DC", dark: "#BDB4FE" },
      bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
      hoverBg: { light: "#0ACC920D", dark: "#77C7AF0D" },
    },
    {
      text: { light: "#8F6C1A", dark: "#E0BE70" },
      bg: { light: "#FFC02E1A", dark: "#E0BE700D" },
      border: { light: "#8F6C1A33", dark: "#E0BE7033" },
      hoverBg: { light: "#FFC02E0D", dark: "#E0BE700D" },
    },
    {
      text: { light: "#9F1AB1", dark: "#EEAAFD" },
      bg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
      border: { light: "#9F1AB114", dark: "#EEAAFD33" },
      hoverBg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
    },
    {
      text: { light: "#067A57", dark: "#77C7AF" },
      bg: { light: "#0ACC9214", dark: "#77C7AF0D" },
      border: { light: "#026AA233", dark: "#7CD4FD33" },
      hoverBg: { light: "#026AA20D", dark: "#7CD4FD0D" },
    },
  ]

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])
  useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])


  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }


  // Filter jobs based on search term, selected skills, and active filters
  const filteredJobs = jobs.filter((job) => {
    // Search term filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase())


    // Skills filter
    const matchesSkills =
      selectedSkills.length === 0 || (job.skills && selectedSkills.some((skill) => job.skills.includes(skill)))
    const matchesJobType =
      activeFilters.length === 0 || (job.jobType && activeFilters.includes(job.jobType));
    const matchesExperienceLevel =
    activeFilters.length === 0 || (job.experienceLevel && activeFilters.includes(job.experienceLevel));
    // We're not implementing all filters since we don't have that data in the job objects
    // but this shows how it would work


    return matchesSearch && matchesSkills && matchesJobType && matchesExperienceLevel;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filteredSuggestions = jobs
  .flatMap((job) => [job.title, job.category, ...(job.skills || [])]) // Collect job titles, categories, and skills
  .filter((item, index, arr) => arr.indexOf(item) === index) // Remove duplicates
  .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
  .slice(0, 5); // Limit to 5 suggestions

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    )
  }
  const DetailView = (job) => {
    sessionStorage.setItem("jobId", job._id);
    navigate(`/jobs/jobid?slug=${job.title}`);
  };


  return (
    <main className="px-6 md:px-24 py-4 md:py-16 bg-[#F2F4F7]">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 heroText">
          Find Your <span className="bg-gradient-to-r from-[#89AC46] to-[#c440ce] text-transparent bg-clip-text">Next <br className="hidden sm:block" /> Freelance</span> Gig
        </h1>
        <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Discover freelance opportunities that match your skills and interests. Use the search and filters to refine
          your results.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="relative mb-6 w-full md:w-1/2 flex justify-center mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholders[placeholderIndex]}
          className="pl-10 w-full h-12 text-md bg-white shadow-sm rounded-lg border-none"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value),setShowSuggestions(e.target.value.length > 0);}}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
      <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md rounded-md mt-1 z-10">
        {filteredSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onMouseDown={() => {
              setSearchTerm(suggestion);
              setShowSuggestions(false);
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    )}
      </div>

      {/* Popular Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularCategories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              className="h-auto py-3 justify-center gap-3 hover:border-primary hover:text-primary"
              onClick={() => addFilter(category.name)}
            >
              <img src={category.image} alt={category.name} className="w-6 h-6" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          <Badge className="ml-2">{activeFilters.length}</Badge>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section - Desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                {activeFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFilters([])}
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Job Type */}
              <Collapsible defaultOpen className="mb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Job Type</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-2">
                  {["One-time project", "Contract", "Full Time", "Part Time"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`job-type-${type}`}
                        checked={activeFilters.includes(type)}
                        onCheckedChange={(checked) => {
                          checked ? addFilter(type) : removeFilter(type)
                        }}
                      />
                      <Label htmlFor={`job-type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Experience Level */}
              <Collapsible defaultOpen className="mb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>Experience Level</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-2">
                  {["Entry level", "Intermediate", "Expert"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exp-level-${level}`}
                        checked={activeFilters.includes(level)}
                        onCheckedChange={(checked) => {
                          checked ? addFilter(level) : removeFilter(level)
                        }}
                      />
                      <Label htmlFor={`exp-level-${level}`} className="text-sm cursor-pointer">
                        {level}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Budget Range */}
              <Collapsible defaultOpen className="mb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget Range</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>₹{budgetRange[0]}</span>
                      <span>₹{budgetRange[1]}+</span>
                    </div>
                    <Slider
                      defaultValue={budgetRange}
                      min={100}
                      max={10000}
                      step={100}
                      onValueChange={(value) => setBudgetRange(value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={budgetRange[0]}
                        onChange={(e) => setBudgetRange([Number.parseInt(e.target.value), budgetRange[1]])}
                        className="h-8 text-sm"
                      />
                      <span className="flex items-center">-</span>
                      <Input
                        type="number"
                        value={budgetRange[1]}
                        onChange={(e) => setBudgetRange([budgetRange[0], Number.parseInt(e.target.value)])}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Project Duration */}
              <Collapsible defaultOpen className="mb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Project Duration</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-2">
                  {["Less than 1 week", "1 to 4 weeks", "1 to 3 months", "3 to 6 months", "Over 6 months"].map(
                    (duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox
                          id={`duration-${duration}`}
                          checked={activeFilters.includes(duration)}
                          onCheckedChange={(checked) => {
                            checked ? addFilter(duration) : removeFilter(duration)
                          }}
                        />
                        <Label htmlFor={`duration-${duration}`} className="text-sm cursor-pointer">
                          {duration}
                        </Label>
                      </div>
                    ),
                  )}
                </CollapsibleContent>
              </Collapsible>

              {/* Location */}
              <Collapsible defaultOpen className="mb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Location</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-2">
                  {["Remote only", "On-site", "Hybrid"].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={activeFilters.includes(location)}
                        onCheckedChange={(checked) => {
                          checked ? addFilter(location) : removeFilter(location)
                        }}
                      />
                      <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                        {location}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Skills */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4" />
                    <span>Skills</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <Command className="rounded-lg border shadow-none">
                    <CommandInput placeholder="Search skills..." />
                    <CommandList className="max-h-48 overflow-auto">
                      <CommandEmpty>No skills found.</CommandEmpty>
                      <CommandGroup>
                        {skills.map((skill) => (
                          <CommandItem
                            key={skill}
                            onSelect={() => toggleSkill(skill)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox checked={selectedSkills.includes(skill)} className="h-4 w-4" />
                            {skill}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section - Mobile */}
        <Collapsible open={showMobileFilters} onOpenChange={setShowMobileFilters} className="lg:hidden mb-4">
          <CollapsibleContent>
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveFilters([])
                      setShowMobileFilters(false)
                    }}
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </div>

                <Tabs defaultValue="jobType">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="jobType">Job Type</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="more">More</TabsTrigger>
                  </TabsList>

                  <TabsContent value="jobType" className="space-y-4">
                    <div className="space-y-2">
                      {["One-time project", "Ongoing work", "Full-time contract", "Part-time"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-job-type-${type}`}
                            checked={activeFilters.includes(type)}
                            onCheckedChange={(checked) => {
                              checked ? addFilter(type) : removeFilter(type)
                            }}
                          />
                          <Label htmlFor={`mobile-job-type-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Project Duration</span>
                      </h3>
                      <div className="space-y-2">
                        {["Less than 1 week", "1 to 4 weeks", "1 to 3 months", "3 to 6 months", "Over 6 months"].map(
                          (duration) => (
                            <div key={duration} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-duration-${duration}`}
                                checked={activeFilters.includes(duration)}
                                onCheckedChange={(checked) => {
                                  checked ? addFilter(duration) : removeFilter(duration)
                                }}
                              />
                              <Label htmlFor={`mobile-duration-${duration}`} className="text-sm cursor-pointer">
                                {duration}
                              </Label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>Experience Level</span>
                      </h3>
                      <div className="space-y-2">
                        {["Entry level", "Intermediate", "Expert"].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-exp-level-${level}`}
                              checked={activeFilters.includes(level)}
                              onCheckedChange={(checked) => {
                                checked ? addFilter(level) : removeFilter(level)
                              }}
                            />
                            <Label htmlFor={`mobile-exp-level-${level}`} className="text-sm cursor-pointer">
                              {level}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Budget Range</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>₹{budgetRange[0]}</span>
                          <span>₹{budgetRange[1]}+</span>
                        </div>
                        <Slider
                          defaultValue={budgetRange}
                          min={100}
                          max={10000}
                          step={100}
                          onValueChange={(value) => setBudgetRange(value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={budgetRange[0]}
                            onChange={(e) => setBudgetRange([Number.parseInt(e.target.value), budgetRange[1]])}
                            className="h-8 text-sm"
                          />
                          <span className="flex items-center">-</span>
                          <Input
                            type="number"
                            value={budgetRange[1]}
                            onChange={(e) => setBudgetRange([budgetRange[0], Number.parseInt(e.target.value)])}
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="more" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Location</span>
                      </h3>
                      <div className="space-y-2">
                        {["Remote only", "On-site", "Hybrid"].map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-location-${location}`}
                              checked={activeFilters.includes(location)}
                              onCheckedChange={(checked) => {
                                checked ? addFilter(location) : removeFilter(location)
                              }}
                            />
                            <Label htmlFor={`mobile-location-${location}`} className="text-sm cursor-pointer">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Sliders className="h-4 w-4" />
                        <span>Skills</span>
                      </h3>
                      <Command className="rounded-lg border shadow-none">
                        <CommandInput placeholder="Search skills..." />
                        <CommandList className="max-h-48 overflow-auto">
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            {skills.map((skill) => (
                              <CommandItem
                                key={skill}
                                onSelect={() => toggleSkill(skill)}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Checkbox checked={selectedSkills.includes(skill)} className="h-4 w-4" />
                                {skill}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowMobileFilters(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={() => setShowMobileFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Results Section */}
        <div className="flex-1">
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1 px-3 py-1.5 bg-white hover:border-gray-300">
                  {filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent "
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {filter} filter</span>
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilters([])}
                className="text-xs text-muted-foreground hover:text-foreground hover:bg-white"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Sort and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <p className="text-muted-foreground">
              <strong>{filteredJobs.length}</strong> Gigs found
            </p>
            <div className="flex gap-2">
              <Select defaultValue="relevance" >
                <SelectTrigger className="w-[180px] bg-white shadow-sm rounded-lg">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                    <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sliders className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>View Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Checkbox id="saved-only" className="mr-2" />
                      <Label htmlFor="saved-only">Saved jobs only</Label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="verified-only" className="mr-2" />
                      <Label htmlFor="verified-only">Verified clients only</Label>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Calendar03Icon className="mr-2 h-4 w-4" />
                    <span>Posted today</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar01Icon className="mr-2 h-4 w-4" />
                    <span>Posted this week</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="w-full h-64 animate-pulse">
                  <CardHeader className="h-1/3 bg-gray-200" />
                  <CardContent className="h-2/3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card
                  onClick={() => DetailView(job)}
                  key={job._id}
                  className="cursor-pointer bg-[#FFFFFF] hover:border-[#0C0E1226] dark:bg-[#1D1E26] dark:hover:border-[#FFFFFF26] transition-all duration-300 shadow-none border border-transparent rounded-[1rem]"
                >
                  <CardHeader className="relative">
                    <div className="flex items-center gap-[0.75rem]">
                      <img
                        src={job.image || "/placeholder.svg"}
                        alt="logo"
                        className="w-12 h-12 object-contain p-1 rounded-xl border border-[#0C0E1226]"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-[#12131AE5] dark:text-[#FFFFFFC7] text-[1.125rem] font-bold ">
                          {job.title}
                        </CardTitle>
                        <p className="text-sm text-[0.75rem] text-[#12131AA6] dark:text-[#A1A1A1]">{job.category}</p>
                      </div>
                      <div
                        className="flex items-center gap-1 px-3 py-1 rounded-md text-[0.75rem] font-medium"
                        style={{
                          backgroundColor: "#E8F5E9",
                          color: "#067A57",
                        }}
                      >
                        <span>💰 ₹{job.budget}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <p className="text-sm font-normal text-[#12131AA6] dark:text-[#C7C7C7] truncate-2-lines">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills && job.skills.length > 0 ? (
                        <>
                          {job.skills.slice(0, 3).map((skill, index) => {
                            const style = tagStyles[index % tagStyles.length] || tagStyles[0];
                            return (
                              <Badge
                                key={index}
                                className="text-[0.75rem] font-medium cursor-pointer shadow-none"
                                style={{
                                  color: style.text.light,
                                  backgroundColor: style.bg.light,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = style.hoverBg.light)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = style.bg.light)}
                              >
                                {skill}
                              </Badge>
                            );
                          })}

                          {job.skills.length > 4 && (
                            <Badge className="text-[0.75rem] font-medium cursor-pointer shadow-none bg-gray-200 text-gray-700">
                              +{job.skills.length - 3}
                            </Badge>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No jobs found</h2>
              <p className="text-gray-500">Try adjusting your search or check back later for new opportunities.</p>
            </div>
          )}

          {/* Load More */}
          {filteredJobs.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="outline" className="px-8">
                Load More <ArrowRight01Icon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

