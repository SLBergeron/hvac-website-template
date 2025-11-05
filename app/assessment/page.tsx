import { AssessmentQuiz } from "@/components/Assessment/AssessmentQuiz";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import {
  getBusinessInfo,
  getFormattedPhone,
  getWebhookUrl,
} from "@/lib/template-config";

// Get business data from centralized config
const business = getBusinessInfo();
const phone = getFormattedPhone();
const webhookUrl = getWebhookUrl();

export const metadata: Metadata = {
  title: `Free ${business.type} System Assessment | ${business.name}`,
  description:
    `Take our free 3-minute assessment to find out if your ${business.type} system is costing you money. Get personalized recommendations and next steps.`,
};

export default function AssessmentPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <AssessmentQuiz
        businessName={business.name}
        phone={phone}
        webhookUrl={webhookUrl || undefined}
      />
    </div>
  );
}
