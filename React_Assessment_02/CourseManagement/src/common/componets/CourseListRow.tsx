import React from "react";
import type { courseListType } from "../type/courseListType";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"
import { useDispatch } from "react-redux";
import { type AppDispathStore } from "../../store/store";
import { toast } from "react-toastify";
import { deleteCourse, editCourse } from "../../features/courseSlice";
import { useNavigate } from "react-router-dom";
import useDecodeToken from "../../hooks/useDecodeToken";
import api from "../../api/api";
import { PrivateEndPoints } from "../../api/endPoints";
import { apiErrorHandlers } from "../../apiErrorHandler/apiErrorHandler";

interface CouseListProbs {
    course: courseListType
}

const CousrListRow: React.FC<CouseListProbs> = ({ course }) => {

    const dispatch = useDispatch<AppDispathStore>();
    const navigate = useNavigate();

    const role = useDecodeToken();

    const deleteCourseMethod = async (id: number) => {
        try {
            await dispatch(deleteCourse(id)).unwrap();

            toast.success("Deleted Succesfully");
        }
        catch (err: any) {
            toast.error(err || "Faild");
        }
    }

    const editCourseMethod = (data: courseListType) => {
        dispatch(editCourse(data));
        navigate("/addcourse");
    }

    const enrollUser = async (id: number) => {
        try {
            await api.post(PrivateEndPoints.enrollment, { courseId: id });
            toast.success("Enrolled Succesfully");
        }
        catch (err: any) {
            const response = apiErrorHandlers(err);
            toast.error(response.message);
            console.error(response.message);
        }
    }

    return (
        <tr>
            <td>{course.id}</td>
            <td>{course.name}</td>
            <td>{course.durationInMonths}</td>
            <td>{new Date(course.createdOn).toDateString()}</td>
            <td>{course.minimumRequiredAge}</td>
            <td>{course.startDate}</td>
            <td>{course.enrolledUsersCount}</td>
            {role === "True" ?

                <td>
                    <div className=" d-flex justify-content-around">
                        <FaTrash color="red" onClick={() => deleteCourseMethod(course.id)} style={{ cursor: "pointer" }} />
                        <FaEdit color="blue" onClick={() => editCourseMethod(course)} style={{ cursor: "pointer" }} />
                    </div>
                </td>

                : <td>
                    <FaPlus color="green" onClick={() => enrollUser(course.id)} style={{ cursor: "pointer" }} />
                </td>
            }

        </tr>
    )
}

export default React.memo(CousrListRow);