import ProfileModal from "@/components/Common/Modal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { openModal } from "@/redux/features/modal/modalSlice";

const Home = () => {
  const dispatch = useDispatch();
  const modalReducer = useSelector((state) => state.modalReducer);
  useEffect(() => {
    dispatch(openModal(undefined));
  }, []);

  return (
    <>
      <div className="mt-24">
        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
          {modalReducer.isOpen && <ProfileModal />}
        </div>
      </div>
    </>
  );
};

export default Home;
