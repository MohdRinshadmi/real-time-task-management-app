import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginService } from "../services/auth/loginService";
import { setAccessToken } from "../global/localStorage";
import {
  addTaskService,
  getTasksService,
  deleteTaskService,
} from "../services/task/taskService";
import {
  createDetailedTaskService,
  updateTaskService,
} from "../services/task/taskExtraService";
import {
  googleCallbackService,
} from "../services/auth/googleService";
import { Task } from "../types";
import { setLoggedIn } from "../store/store";

export const ApiHook = {
  // ---------------------------------------- Login -----------------------------------------
  CallLoginUser: () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
        if (!email || !password) {
          toast.error("Please enter both email and password");
          throw new Error("Missing credentials");
        }
        const data = await loginService(email, password);
        return data;
      },
      onSuccess: (data) => {
        console.log("on success login", data);

        if (data && data.data.token) {
          setAccessToken(data.data.token);
        }
        dispatch(setLoggedIn(data.data.isLoggedIn));
        toast.success("Login successful!");
        navigate("/dashboard");
      },
      onError: (error) => {
        console.log("login error", error);
      },
    });
  },

  // ---------------------------------------- Google OAuth -----------------------------------------
  CallGoogleLogin: () => {
    // SPA redirect to Google OAuth using window.location.assign
    return () => {
      try {
        window.location.assign(`${import.meta.env.VITE_BASE_URL}/auth-google`);
      } catch (error) {
        console.error("Google login redirect failed", error);
        toast.error("Google login failed");
      }
    };
  },

  HandleGoogleCallback: () => {
    // This should be called on the callback route after Google redirects back
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: async (query: string) => {
        // query is the search string from the callback URL (e.g., ?code=...&state=...)
        const data = await googleCallbackService(query);
        return data;
      },
      onSuccess: (data) => {
        console.log('google call back response', data);

        if (data && data.data.token) {
          setAccessToken(data.data.token);
          dispatch(setLoggedIn(true));
          toast.success("Google login successful!");
          navigate("/dashboard");
        }
      },
      onError: () => {
        toast.error("Google login failed");
      },
    });
  },

  //   Call2faVerifyOtp: () => {
  //     const dispatch = useDispatch();
  //     const navigate = useNavigate();

  //     const mutation = useMutation({
  //       mutationFn: (credentials) => verify2faOtp(credentials),
  //       onSuccess: (response) => {
  //         if (response.status) {
  //           dispatch(setIsAuthenticated(true));
  //           dispatch(setLoginResponse(response));
  //           toast.success("2FA verified successfully!");
  //           navigate("/dashboard", { replace: true });
  //         }
  //       },
  //       onError: (err) => {
  //         console.error("ERROR FROM Call2faVerifyOtp:", err);
  //         toast.error("2FA verification failed");
  //       },
  //     });

  //     return mutation;
  //   },

  //   CallLogout: () => {
  //     const dispatch = useDispatch();
  //     const navigate = useNavigate();

  //     const mutation = useMutation({
  //       mutationFn: () => logout(),
  //       onSuccess: (data) => {
  //         if (data.status) {
  //           dispatch(setLoginResponse(null));
  //           dispatch(setIsAuthenticated(false));
  //           dispatch(setTwofaResponse({ isEnabled: false, twoFadata: {} }));
  //           localStorage.clear();
  //           toast.success("Logged out successfully!");
  //           navigate("/login");
  //           window.location.reload();
  //         }
  //       },
  //       onError: (error) => {
  //         console.error("Logout error:", error);
  //         toast.error("Logout failed");
  //       },
  //     });

  //     return mutation;
  //   },

  //   CallForgotPassword: () => {
  //     const mutation = useMutation({
  //       mutationFn: (data) => ForgotPassword(data),
  //       onSuccess: () => {
  //         toast.success("Forgot password email sent!");
  //       },
  //       onError: () => {
  //         toast.error("Forgot password request failed");
  //       },
  //     });

  //     return mutation;
  //   },

  // ---------------------------------------- Add Task -----------------------------------------
  addTask: async ({ newTask, tasks, setTasks, setNewTask }: {
    newTask: string;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    setNewTask: (task: string) => void;
  }) => {
    if (!newTask.trim()) {
      toast.warning("Please enter a task title");
      return;
    }
    try {
      const response = await addTaskService({
        title: newTask,
        status: "pending",
      });
      console.log("taskkkkkk add taskkkkkk", response);
      if (response.status && response.data.task) {
        setTasks([...tasks, response.data.task]);
        setNewTask("");
        toast.success("Task added successfully!");
      } else {
        toast.error("Failed to add task");
      }
    } catch (error) {
      toast.error("Failed to add task");
    }
  },

  // ---------------------------------------- Fetch Tasks -----------------------------------------
  fetchTasks: async ({ setTasks, setLoading }: {
    setTasks: (tasks: Task[]) => void;
    setLoading: (loading: boolean) => void;
  }) => {
    setLoading(true);
    try {
      const data = await getTasksService();
      console.log("fetch takssss", data);

      setTasks(data.data.data.tasks || []);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  },

  // ---------------------------------------- Create Detailed Task -----------------------------------------
  createDetailedTask: async ({
    taskForm,
    tasks,
    setTasks,
    setIsModalOpen,
    setTaskForm,
  }: {
    taskForm: any; // Define strict type for taskForm if possible
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    setTaskForm: (form: any) => void;
  }) => {
    try {
      const res = await createDetailedTaskService(taskForm);
      console.log('create detailed task', res);
      
      setTasks([...tasks, res.data.data.task]);
      setIsModalOpen(false);
      setTaskForm({ title: "", description: "", status: "pending" });
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
    }
  },

  // ---------------------------------------- Mark Complete -----------------------------------------
  markComplete: async ({ task, tasks, setTasks }: {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
  }) => {
    try {
      if (!task.id && !task._id) return;
      const res = await updateTaskService((task.id || task._id) as string, {
        ...task,
        status: "completed",
      });
      setTasks(
        tasks.map((t) =>
          t.id === task.id || t._id === task._id ? res.data.data.task : t
        )
      );
      toast.success("Task marked as complete!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  },

  // ---------------------------------------- Delete Task -----------------------------------------
  deleteTask: async ({ task, tasks, setTasks }: {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
  }) => {
    console.log("delete raskkk apiiiiii", task);

    try {
      if (!task.taskId) return;
      await deleteTaskService(task.taskId);
      const filteredTasks = tasks.filter((t) => t.taskId !== task.taskId); // <-- return the comparison
      setTasks(filteredTasks);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  },
};

export default ApiHook;
