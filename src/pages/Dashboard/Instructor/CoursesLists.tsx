import GridCoursesList from "@/components/Dashboard/Instructor/GridCoursesList";

const CoursesLists = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
      <GridCoursesList handleChange={null} />
    </div>
  );
};

export default CoursesLists;
