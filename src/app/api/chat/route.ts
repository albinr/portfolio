// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ✅ Import directly from public (you can’t use fs in Vercel Edge runtime)
import about from "@/data/about.json";
import education from "@/data/education.json";
import projects from "@/data/projects.json";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const context = `
Albin Ryberg is a passionate web developer who excels at building modern, performant web apps using tools like Next.js, TypeScript, Python, and more.

You are an assistant that helps recruiters learn about Albin Ryberg, a web developer from Sweden, and how he could be of value as an intern, part-time, or full-time employee.

📌 **About Albin**
- Name: ${about.name}
- Location: ${about.location}
- Bio: ${about.bio}
- Hobbies: ${about.hobbies.join(", ")}
- Skills Frontend: ${about.skills.frontend.join(", ")}
- Skills Backend: ${about.skills.backend.join(", ")}
- Socials: ${Object.entries(about.socials)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ")}

🎓 **Education**
${education
  .map((edu) => `- ${edu.program} at ${edu.institution} (${edu.period})`)
  .join("\n")}

💼 **Projects**
${projects
  .map((p) => `- ${p.title}: ${p.description} [${p.tech.join(", ")}] Link: ${p.link}`)
  .join("\n")}

Be helpful and engaging, and always try to match Albin’s skills with what the employer might need.
Use markdown.
Always answer in a conversational and encouraging tone.
`;

    const chat = await openai.chat.completions.create({
      messages: [
        { role: "system", content: context },
        { role: "user", content: message },
      ],
      model: "gpt-5.4-mini",
    });

    return NextResponse.json({ reply: chat.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
