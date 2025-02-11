import React from "react";
import { useNavigate } from "react-router-dom";

const EventsList = (props) => {
  const { eventsList } = props;
  const navigate = useNavigate();

  const listview = eventsList.map((event, i) => {
    return (
      <div className="col-md-12 p-2 mb-2" key={i}>
        <div className="border border-primary rounded p-3 shadow-sm">
          <h3 className="text-center">{event.event_name}</h3>
          <p className="font-weight-bold mt-3">**ঢাকাস্থ চন্দনাইশবাসী**</p>
          <p>আসসালামু আলাইকুম,</p>
          <p className="font-weight-bold mt-3">{event.event_description}</p>
          <p><span className="font-weight-bold">ভেন্যু -</span> {event.place}</p>
          <p><span className="font-weight-bold">তারিখ-</span> ১৮ই জানুয়ারি ২০২৫, শনিবার।</p>
          <p>
            সমিতির সদস্যবৃন্দের সন্তান যারা এসএসসি/এইসএসসি ও সমমান পরীক্ষা
            ২০২৩/২০২৪ এ গৌরবোজ্জ্বল ফলাফল করেছেন এবং যারা কোরআনে হাফেজ হয়েছেন এ
            অনুষ্ঠানে সংবর্ধনা জানানোর মাধ্যমে তাদেরকে উৎসাহিত করা হবে,যা তাদের
            ভবিষ্যৎ জীবন এগিয়ে নিতে অনুঘটকের কাজ করবে আশা করি।
          </p>
          <p>
            যারা ঢাকায় অবস্থান করছেন,কিন্তু এখনও চন্দনাইশ সমিতি -ঢাকা'র সদস্যফরম
            পূরণ করেননি,তাদেরকে নিম্নে যোগাযোগ করার অনুরোধ রইলো।
          </p>
          <p className="font-weight-bold font-italic">১. জনাব মুহাম্মদ জাকের হোসাইন, ০১৭১১১১০১২৮</p>
          <p className="font-weight-bold font-italic">২.জনাব মোঃ রহিম উদ্দীন, ০১৭১১৪০৬৬৮৬</p>
          <p className="font-weight-bold font-italic">৩.জনাব মোঃ জিয়া উদ্দিন, ০১৮২৯ ৮৯১৩৯৫</p>
          <p className="font-weight-bold">Email: joynurent@gmail.com</p>
          <p>পৃষ্টপোষক সদস্য -৳১০,০০০/ এককালীন</p>
          <p>আজীবন সদস্য -৳২০০০/এককালীন</p>
          <p className="font-weight-bold">## কোন ধরনের মাসিক চাঁদা নেই।##</p>
          <p>
            পৃষ্ঠপোষক ও আজীবন সদস্য ফি নিম্নোক্ত হিসাবের মাধ্যমে প্রদান করা
            যাবে।
          </p>
          <p>
            * ব্যাংক হিসাব নং: Chandanaish Samaity-Dhaka, A/c. No:
            0013201000012176 United Commercial Bank-PLC, Principal Branch,
            Dhaka.
          </p>
          <p>* Bkash/Nagad (Personal): 01829 891 395, Md. Zia Uddin</p>
          <p>--------------------------------------------------------</p>
          <p>আপনাদের অংশগ্রহণই আমাদের পথচলা</p>
          <p>--------------------------------------------------------</p>
          <hr />
          <div className="row">
            <div className="col text-left">
              <b>Date: {event.event_date}</b>
            </div>
            <div className="col text-right">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/register`);
                }}
              >
                Book Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{listview}</>;
};

export default EventsList;



