'use client'
import { parseCookies } from "nookies";
import CreateKhotian from "../../_content/CreateKhotian"

export default function Home() {

    let citizen = parseCookies();
    let c = JSON.parse(citizen?.citizen);

    return (
        <CreateKhotian data={c}  className="bg-[#ffff] w-full"/>
    )

}
