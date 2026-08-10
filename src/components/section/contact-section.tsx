"use client";

import * as React from "react";
import { ArrowRight, Mail, MessageSquare, User } from "lucide-react";

import Meeting from "@/components/meeting";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_DATA: FormData = { name: "", email: "", message: "" };

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Name",
    icon: User,
    placeholder: "Your name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    icon: Mail,
    placeholder: "your.email@example.com",
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    icon: MessageSquare,
    placeholder: "What would you like to discuss?",
    rows: 5,
  },
] as const;

export default function ContactSection() {
  const [formData, setFormData] = React.useState<FormData>(INITIAL_DATA);
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch(DATA.contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData(INITIAL_DATA);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(
          errorData.error || "Something went wrong. Please try again.",
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  const socials = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.url !== "#",
  );

  return (
    <section id="contact">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 21}>
          <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
          <span className="text-background text-sm font-medium">
            Contact Me
          </span>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      <div className="flex flex-col gap-y-3 items-center justify-center">
        <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
          Let&apos;s Connect
        </h2>
        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out!
        </p>
      </div>
      <div className="border border-dashed border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-border">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div>
              <div className="p-4 border-b border-dashed border-border">
                <h3 className="text-xl font-medium mb-1">Send a message</h3>
                <p className="text-sm text-muted-foreground">
                  Drop a message below to discuss projects or just say hi.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="border-b border-dashed border-border divide-y divide-dashed divide-border">
                  {FIELDS.map((field) => {
                    const Icon = field.icon;
                    const commonClasses =
                      "flex-1 py-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors duration-200";

                    return (
                      <div
                        key={field.name}
                        className="flex items-start gap-4 px-4 group transition-colors focus-within:bg-muted/30">
                        <div className="py-4 flex items-center text-muted-foreground/60 transition-colors duration-200 group-focus-within:text-foreground">
                          <Icon className="w-5 h-5" />
                        </div>
                        {field.type === "textarea" ?
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                            aria-label={field.label}
                            placeholder={field.placeholder}
                            rows={field.rows}
                            className={`${commonClasses} resize-none`}
                          />
                        : <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                            aria-label={field.label}
                            placeholder={field.placeholder}
                            className={commonClasses}
                          />
                        }
                      </div>
                    );
                  })}
                </div>

                <div className="p-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`group w-full px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 bg-primary text-primary-foreground hover:brightness-110 hover:-translate-y-px ${
                      status === "submitting" ?
                        "opacity-70 cursor-not-allowed"
                      : ""
                    }`}>
                    {status === "submitting" ?
                      "Sending..."
                    : <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    }
                  </button>

                  {status === "success" && (
                    <p className="text-link text-sm text-center mt-3">
                      Got your message! I&apos;ll get back to you soon
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-destructive text-sm text-center mt-3">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 divide-y divide-dashed divide-border">
            {/* Meeting Scheduler */}
            <div className="flex flex-col items-start w-full">
              <div className="p-4 border-b border-dashed border-border w-full">
                <h3 className="text-xl font-medium mb-1">Schedule a meeting</h3>
                <p className="text-sm text-muted-foreground">
                  Book a 30-minute call on Google Meet
                </p>
              </div>

              <div className="p-4 border-b border-dashed border-border w-full">
                <h4 className="text-lg font-medium mb-1">
                  30-minute discovery call
                </h4>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s discuss your project goals
                </p>
              </div>
              {DATA.contact.meeting.calUsername && (
                <div className="p-4 w-full">
                  <Meeting />
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-start w-full">
              <div className="p-4 border-b border-dashed border-border w-full">
                <h3 className="text-xl font-medium mb-1">Follow & connect</h3>
                <p className="text-sm text-muted-foreground">
                  Stay updated with my latest thoughts
                </p>
              </div>

              <div className="p-4 w-full flex justify-center">
                <div className="grid grid-cols-4 gap-3 w-full max-w-70">
                  {socials.map(([key, social]) => {
                    const Icon = social.icon;
                    return (
                      <Tooltip key={key}>
                        <TooltipTrigger
                          render={
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }>
                          <div className="group flex items-center justify-center rounded-3xl border border-dotted border-border bg-card/90 backdrop-blur-3xl p-3 text-muted-foreground shadow-[0_0_10px_3px] shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:bg-muted hover:text-link hover:border-primary/30">
                            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          sideOffset={8}
                          className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                          <p>{social.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
