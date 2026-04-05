import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import CreateSessionForm from "./CreateSessionForm";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

      console.log("FULL API RESPONSE:", response.data);

      // Safe extraction of sessions array
      const sessionData = Array.isArray(response.data.sessions)
        ? response.data.sessions
        : [];

      setSessions(sessionData);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      toast.error("Failed to fetch sessions");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSessions = async (sessionData) => {
    try {
      // /api/sessions/${id}
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session deleted successfully");


      setOpenDeleteAlert({
        open: false,
        data: null,
      });
            fetchAllSessions();

    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete session");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Sessions</h1>

          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus />
            Add New
          </button>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              Loading sessions...
            </div>
          ) : Array.isArray(sessions) && sessions.length > 0 ? (

            sessions.map((data, index) => (
              <SummaryCard
                key={data?._id || index}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || "N/A"}
                topicsToFocus={data?.topicsToFocus || "No topics"}
                experience={data?.experience || "Not specified"}
                questions={data?.questions?.length || 0}
                description={data?.description || "No description"}
                lastUpdate={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : "Never"
                }
                onSelect={() =>
                  navigate(`/interview-prep/${data?._id}`)
                }
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data,
                  })
                }
              />
            ))

          ) : (

            <div className="col-span-full flex flex-col items-center py-20 text-center bg-white rounded-xl shadow">

              <h3 className="text-xl font-semibold mb-2">
                No sessions yet
              </h3>

              <p className="text-gray-500 mb-5">
                Create your first interview prep session
              </p>

              <button
                onClick={() => setOpenCreateModal(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Create Session
              </button>

            </div>

          )}
        </div>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm onSuccess={fetchAllSessions} />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() =>
          setOpenDeleteAlert({
            open: false,
            data: null,
          })
        }
        hideHeader
      >
        <div className="p-6">

          <h3 className="text-lg font-semibold mb-4">
            Delete Session?
          </h3>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "
            {openDeleteAlert.data?.role || "this session"}"?
          </p>

          <div className="flex gap-3 justify-end">

            <button
              onClick={() =>
                setOpenDeleteAlert({
                  open: false,
                  data: null,
                })
              }
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={() => deleteSessions(openDeleteAlert.data)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>

          </div>
        </div>
      </Modal>



    </DashboardLayout>
  );
};

export default Dashboard;