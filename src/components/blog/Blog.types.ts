export interface IBlog {
    pkblog: number,
    title: string,
    summary: string,
    blog_tags: Object[]
}

export interface BlogCardProps {
    blog: IBlog
}