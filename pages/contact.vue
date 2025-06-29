<template>
	<div class="container mx-auto px-4 pt-20">
		<!-- Header Section -->
		<section class="py-16 text-center">
			<div class="max-w-3xl mx-auto space-y-6">
				<h1 class="text-4xl md:text-6xl font-bold">
					<span class="bg-gradient-to-r from-foreground via-primary to-chart-1 bg-clip-text text-transparent"> Get In Touch </span>
				</h1>
				<p class="text-lg text-muted-foreground">Ready to start your next mobile project? Let's collaborate and bring your ideas to life</p>
			</div>
		</section>

		<div class="max-w-6xl mx-auto py-8">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Contact Form -->
				<Card class="p-8 border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader class="px-0 pt-0">
						<CardTitle class="text-2xl">Send a Message</CardTitle>
						<CardDescription> Fill out the form below and I'll get back to you as soon as possible </CardDescription>
					</CardHeader>

					<CardContent class="px-0 pb-0">
						<form
							class="space-y-6"
							@submit.prevent="submitForm"
						>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label for="name">Name *</Label>
									<Input
										id="name"
										v-model="form.name"
										placeholder="Your full name"
										required
										:disabled="isSubmitting"
									/>
								</div>
								<div class="space-y-2">
									<Label for="email">Email *</Label>
									<Input
										id="email"
										v-model="form.email"
										type="email"
										placeholder="your@email.com"
										required
										:disabled="isSubmitting"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="subject">Subject *</Label>
								<Input
									id="subject"
									v-model="form.subject"
									placeholder="Project discussion, collaboration, etc."
									required
									:disabled="isSubmitting"
								/>
							</div>

							<div class="space-y-2">
								<Label for="message">Message *</Label>
								<Textarea
									id="message"
									v-model="form.message"
									placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
									rows="6"
									required
									:disabled="isSubmitting"
								/>
							</div>

							<Button
								type="submit"
								class="w-full bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white"
								:disabled="isSubmitting"
							>
								<Send
									v-if="!isSubmitting"
									class="mr-2 h-4 w-4"
								/>
								<Loader2
									v-else
									class="mr-2 h-4 w-4 animate-spin"
								/>
								{{ isSubmitting ? "Sending..." : "Send Message" }}
							</Button>
						</form>
					</CardContent>
				</Card>

				<!-- Contact Information & Social Links -->
				<div class="space-y-8">
					<!-- Contact Info -->
					<Card class="p-8 border-border/50 bg-card/50 backdrop-blur-sm">
						<CardHeader class="px-0 pt-0">
							<CardTitle class="text-2xl">Contact Information</CardTitle>
							<CardDescription> Multiple ways to reach out and connect </CardDescription>
						</CardHeader>

						<CardContent class="px-0 pb-0 space-y-6">
							<div class="space-y-4">
								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<Mail class="h-5 w-5 text-primary" />
									</div>
									<div>
										<div class="font-medium">Email</div>
										<div class="text-muted-foreground text-sm">Available for project discussions</div>
									</div>
								</div>

								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<MapPin class="h-5 w-5 text-primary" />
									</div>
									<div>
										<div class="font-medium">Location</div>
										<div class="text-muted-foreground text-sm">Indonesia (Remote Available)</div>
									</div>
								</div>

								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<Clock class="h-5 w-5 text-primary" />
									</div>
									<div>
										<div class="font-medium">Response Time</div>
										<div class="text-muted-foreground text-sm">Usually within 24 hours</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<!-- Social Links -->
					<Card class="p-8 border-border/50 bg-card/50 backdrop-blur-sm">
						<CardHeader class="px-0 pt-0">
							<CardTitle class="text-2xl">Connect With Me</CardTitle>
							<CardDescription> Follow my work and connect on social platforms </CardDescription>
						</CardHeader>

						<CardContent class="px-0 pb-0">
							<div class="grid grid-cols-1 gap-4">
								<!-- GitHub -->
								<a
									href="https://github.com/arifamsar"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all group"
								>
									<div class="flex items-center space-x-3">
										<div class="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
											<Github class="h-5 w-5 text-background" />
										</div>
										<div>
											<div class="font-medium group-hover:text-primary transition-colors">GitHub</div>
											<div class="text-muted-foreground text-sm">@arifamsar</div>
										</div>
									</div>
									<ExternalLink class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
								</a>

								<!-- LinkedIn -->
								<a
									href="https://id.linkedin.com/in/muhammad-arif-amsar"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all group"
								>
									<div class="flex items-center space-x-3">
										<div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
											<Linkedin class="h-5 w-5 text-white" />
										</div>
										<div>
											<div class="font-medium group-hover:text-primary transition-colors">LinkedIn</div>
											<div class="text-muted-foreground text-sm">Muhammad Arif Amsar</div>
										</div>
									</div>
									<ExternalLink class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
								</a>
							</div>
						</CardContent>
					</Card>

					<!-- Availability Status -->
					<Card class="p-8 border-border/50 bg-gradient-to-br from-primary/5 to-chart-1/5">
						<CardContent class="p-0">
							<div class="flex items-center space-x-3 mb-4">
								<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
								<span class="font-medium text-green-600 dark:text-green-400">Available for new projects</span>
							</div>
							<p class="text-muted-foreground text-sm">I'm currently accepting new mobile development projects. Let's discuss how I can help bring your ideas to life!</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>

		<!-- FAQ Section -->
		<section class="py-16">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-12">
					<h2 class="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
					<p class="text-muted-foreground">Common questions about working together</p>
				</div>

				<div class="space-y-4">
					<Card
						v-for="(faq, index) in faqs"
						:key="index"
						class="border-border/50 hover:border-primary/20 transition-colors"
					>
						<CardContent class="p-6">
							<button
								class="flex items-center justify-between w-full text-left"
								@click="toggleFaq(index)"
							>
								<h3 class="font-semibold">{{ faq.question }}</h3>
								<ChevronDown
									:class="{ 'rotate-180': openFaq === index }"
									class="h-5 w-5 transition-transform"
								/>
							</button>
							<Transition
								enter-active-class="transition-all duration-300 ease-out"
								enter-from-class="opacity-0 max-h-0"
								enter-to-class="opacity-100 max-h-96"
								leave-active-class="transition-all duration-200 ease-in"
								leave-from-class="opacity-100 max-h-96"
								leave-to-class="opacity-0 max-h-0"
							>
								<div
									v-if="openFaq === index"
									class="mt-4 text-muted-foreground"
								>
									{{ faq.answer }}
								</div>
							</Transition>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { Send, Loader2, Mail, MapPin, Clock, Github, Linkedin, ExternalLink, ChevronDown } from "lucide-vue-next";
	import type { ContactForm } from "~/types";

	// SEO
	useSeoMeta({
		title: "Contact - Muhammad Arif Amsar",
		description: "Get in touch for mobile development projects. Available for Flutter, React Native, and Android development work.",
		ogTitle: "Contact - Muhammad Arif Amsar",
		ogDescription: "Ready to start your mobile project? Let's connect!",
	});

	// Form state
	const form = reactive<ContactForm>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const isSubmitting = ref(false);
	const openFaq = ref<number | null>(null);

	// FAQ data
	const faqs = [
		{
			question: "What types of mobile development do you specialize in?",
			answer: "I specialize in Flutter, React Native, and native Android development. I can help with consumer apps, business applications, IoT integrations, and complex mobile solutions.",
		},
		{
			question: "What's your typical project timeline?",
			answer: "Project timelines vary based on complexity. Simple apps take 2-4 weeks, while complex applications can take 2-4 months. I'll provide a detailed timeline during our initial discussion.",
		},
		{
			question: "Do you work with international clients?",
			answer: "Yes! I work with clients globally and am comfortable with remote collaboration. I'm based in Indonesia but available for projects worldwide.",
		},
		{
			question: "What information should I include in my project inquiry?",
			answer: "Please include your project goals, target platforms, timeline, budget range, and any specific features you need. The more details you provide, the better I can help you.",
		},
		{
			question: "Do you provide ongoing maintenance and support?",
			answer: "Yes, I offer post-launch support and maintenance packages to ensure your app stays updated, secure, and compatible with the latest platform versions.",
		},
	];

	// Methods
	const submitForm = async () => {
		if (isSubmitting.value) return;

		isSubmitting.value = true;

		try {
			// Simulate form submission
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Here you would typically send to an API
			console.log("Form submitted:", form);

			// Reset form
			Object.assign(form, {
				name: "",
				email: "",
				subject: "",
				message: "",
			});

			// Show success message (you can implement a toast notification)
			alert("Message sent successfully! I'll get back to you soon.");
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("There was an error sending your message. Please try again.");
		} finally {
			isSubmitting.value = false;
		}
	};

	const toggleFaq = (index: number) => {
		openFaq.value = openFaq.value === index ? null : index;
	};
</script>
