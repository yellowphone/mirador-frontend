import React, { FC } from "react"
import { useQuery } from "@apollo/client"
import { FIND_EXPERIENCE_BY_ID } from "../../../graphql/queries/experienceQuery"
import { Card } from "../../shared/card/Card"
import { IExperience } from "../../experience/Experience.types"

interface BlogExperienceCardProps {
    pkexperience: number
}

export const BlogExperienceCard: FC<BlogExperienceCardProps> = ({ pkexperience }) => {
    const { data, loading, error, refetch } = useQuery(FIND_EXPERIENCE_BY_ID, {
        variables: {
            pkexperience: pkexperience
        }
    })

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    console.log(data)

    const experience: IExperience = {
        fk_experience_location: data["findExperienceById"]["pkexperience"],
        imageUrl: "http://www.citrusmilo.com/acadia/joebraun_precipice27.jpg",
        imageAlt: "ok",
        title: data["findExperienceById"]["title"],
        elevation: data["findExperienceById"]["elevation"],
        miles: data["findExperienceById"]["miles"],
        rating: 3,
        lat: (data["findExperienceById"]["locations"]["lat"]),
        lng: (data["findExperienceById"]["locations"]["lng"]),
        summary: data["findExperienceById"]["summary"],
        difficulty: data["findExperienceById"]["difficulty"]
    }

    return (
        <>
            <Card key={experience["title"]} experience={experience}/>
        </>
    )
}