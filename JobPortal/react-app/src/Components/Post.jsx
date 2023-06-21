import React from "react";
const job = {
    title: "Software Engineer", // the job title
    company: "Google", // the name of the company offering the job
    location: "Mountain View, CA", // the location of the job
    type: "Full-time", // the type of job (e.g. full-time, part-time, contract, etc.)
    link: "https://www.google.com/careers/software-engineer/", // a link to the job posting
};

function Post() {
    return (
        <div className="bg-white shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.type}</p>
            <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
            >
                Learn more
            </a>
        </div>
    );
}

export default Post;
