import type { Metadata } from "next";
import { weddingMetadata } from "./metadata";

export const metadata: Metadata = weddingMetadata;

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Schema for Event */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Lễ Cưới Huy Thái & Thuỷ Tiên",
            "description": "Lời mời tham dự lễ cưới của Huy Thái & Thuỷ Tiên",
            "startDate": "2025-10-26T10:00:00+07:00",
            "endDate": "2025-10-26T14:00:00+07:00",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Nhà Hàng Đất Việt",
              "address": "Đối diện cổng Cam Wyndham",
              "addressCountry": "VN",
            },
            "organizer": {
              "@type": "Person",
              "name": "Huy Thái & Thuỷ Tiên",
            },
            "image": "https://lehuythai.com/wedding/featured.png",
            "url": "https://lehuythai.com/wedding",
          }),
        }}
      />
      {children}
    </>
  );
}


