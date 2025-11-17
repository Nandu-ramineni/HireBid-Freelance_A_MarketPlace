import React from 'react'
import { HeroSection } from './Hero'
import { FeaturedBlog } from './FeaturedBlog'
import { BlogGrid } from './BlogGrid'
import { UploadBlog } from './UploadBlog'
import { HireBidOverview } from './HireBidOverview'
import { NewsletterCTA } from './NewsletterCTA'

const Blog = () => {
    return (
        <div>
            <HeroSection/>
            <FeaturedBlog/>
            <BlogGrid/>
            <UploadBlog/>
            <HireBidOverview/>
            <NewsletterCTA/>
        </div>
    )
}

export default Blog