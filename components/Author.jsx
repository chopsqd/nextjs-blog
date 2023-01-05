import React from 'react';
import Image from "next/image";

const Author = ({author}) => {
    return (
        <div className={"flex justify-center items-center flex-col mt-20 mb-8 p-12 rounded-lg bg-black bg-opacity-20"}>
            <div className="-mt-24">
                <Image
                    src={author.photo.url}
                    unoptimized
                    alt={author.name}
                    height={100}
                    width={100}
                    className={"align-middle rounded-full"}
                />
            </div>
            <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
            <p className={"text-white text-lg"}>{author.bio}</p>
        </div>
    );
};

export default Author;