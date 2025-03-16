import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <main className="overflow-y-auto h-full">
      <Navbar />
      <section className="container max-w-full flex flex-col gap-6 w-full py-5 ">
        <div
          className="flex justify-between items-center gap-5
        sm:flex-col-reverse
        lg:flex-row"
        >
          <div className="flex flex-col gap-2 sm:w-full lg:w-8/12">
            <h1 className="text-3xl uppercase text-primaryColor font-semibold ">
              من نحن؟
            </h1>
            <span>
              مرحبًا بك في iLinks، المنصة المثالية المصممة لمساعدة المحترفين في
              عرض مهاراتهم وخبراتهم ومشاريعهم من خلال مواقع بورتفوليو مخصصة.
              مهمتنا هي سد الفجوة بين الأفراد الموهوبين والشركات التي تبحث عن
              المرشحين المثاليين من خلال تقديم حل مبتكر وفعال لكل من الباحثين عن
              عمل وأصحاب العمل على حد سواء.
            </span>
          </div>
          <img
            src="/assets/bearded-engineer-his-home-office-night-working-gear-mechanism.jpg"
            width={500}
            className="min-w-[500px] min-h-[100px]"
          />
        </div>
        <div
          className="flex justify-between items-center gap-5
        sm:flex-col-reverse
        lg:flex-row-reverse"
        >
          <div className="flex flex-col gap-2 sm:w-full lg:w-9/12">
            <h2 className="text-3xl uppercase text-primaryColor font-semibold ">
              رؤيتنا
            </h2>
            <span>
              نهدف إلى إحداث ثورة في عملية التوظيف من خلال إنشاء مساحة ديناميكية
              وتفاعلية يمكن للمحترفين من خلالها عرض خبراتهم بطريقة مرئية وجذابة.
              نؤمن بأن البورتفوليو المصمم بعناية يتحدث بصوت أعلى من السيرة
              الذاتية التقليدية، كما أن منصتنا تمكّن المستخدمين من بناء علامتهم
              الشخصية بسهولة.
            </span>
          </div>
          <img
            src="/assets/3.jpg"
            width={400}
            className="min-w-[400px] min-h-[100px]"
          />
        </div>
        <div
          className="flex justify-between items-center gap-5
        sm:flex-col-reverse
        lg:flex-row"
        >
          <div className="flex flex-col gap-2 sm:w-full lg:w-9/12">
            <h3 className="text-3xl uppercase text-primaryColor font-semibold ">
              مهمتنا
            </h3>
            <span>
              نهدف إلى إحداث ثورة في عملية التوظيف من خلال إنشاء مساحة ديناميكية
              وتفاعلية يمكن للمحترفين من خلالها عرض خبراتهم بطريقة مرئية وجذابة.
              نؤمن بأن البورتفوليو المصمم بعناية يتحدث بصوت أعلى من السيرة
              الذاتية التقليدية، كما أن منصتنا تمكّن المستخدمين من بناء علامتهم
              الشخصية بسهولة.
            </span>
          </div>
          <img
            src="/assets/4.jpg"
            width={400}
            className="min-w-[400px] min-h-[100px]"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
