import { JobSearchData } from "../lib/Fetch&Check_Data";

// useEffect(() => {
//   JobSearchData({ setJobs });
// }, []);

// // filter jobs
// useEffect(() => {
//   const res = jobs?.filter((item) => {
//     if (item?.jobtitle.toLowerCase().includes(searchJob)) {
//       return item?.jobtitle.toLowerCase().includes(searchJob);
//     } else {
//       return false;
//     }
//   });
//   setJobsFilter(res);
// }, [searchJob]);

// show jobs list
// const JobsList = jobsFilter?.map((item) => {
//   return (
//     <li key={item._id}>
//       <Link
//         target="_blank"
//         to={`/userIlinks/${item.username}`}
//         className="flex items-center justify-between"
//       >
//         <img
//           loading="lazy"
//           src={item.avatar}
//           alt="user-job-img"
//           className="min-w-[30px] h-[30px] rounded-full "
//         />
//         <p className="capitalize text-sm font-medium text-center w-4/12">
//           {item.username}
//         </p>
//         <p className="capitalize text-sm font-medium text-center w-4/12">
//           {item.jobtitle}
//         </p>
//       </Link>
//     </li>
//   );
// });
