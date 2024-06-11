
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableData from "@/Components/TableData";
import TableHeader from "@/Components/TableHeader";
import Pagination from "@/Components/Pagination";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {};

    const searchField = (fieldName, value) => {
        if (value) {
            queryParams[fieldName] = value;
        } else {
            delete queryParams[fieldName];
        }
        router.get(route('task.index'), queryParams);
    }
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortByField = (fieldName) => {
        if (fieldName === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = fieldName;
            queryParams.sort_direction = "asc";
        }
        router.get(route('task.index'), queryParams);

    };

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
    >
        <Head title="Tasks" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100 snap-mandatory snap-x">
                        <table className=" snap-x w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <TableHeader name={"id"}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortByField={sortByField}
                                        sortable={true}>Id</TableHeader>
                                    <TableHeader name={"image"} >Image</TableHeader>
                                    <TableHeader name = {"project"}> Project</TableHeader>
                                    <TableHeader name={"task_name"}
                                        sortByField={sortByField}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortable={true}>Name</TableHeader>
                                    <TableHeader name={"status"}
                                        sortByField={sortByField}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortable={true}>Status</TableHeader>

                                    <TableHeader name={"priority"}
                                        sortByField={sortByField}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortable={true} >Priority</TableHeader>
                                    <TableHeader name={"created_at"}
                                        sortByField={sortByField}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortable={true}>Created At</TableHeader>
                                    <TableHeader  >Created By</TableHeader>
                                    <TableHeader name={"due_date"}
                                        sortByField={sortByField}
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortable={true}>Due Date</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </tr>
                            </thead>

                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <TableHeader ></TableHeader>
                                    <TableHeader ></TableHeader>
                                    <TableHeader >
                                    <TextInput
                                        className="w-full"
                                        placeholder="Project Name"
                                        defaultValue={queryParams.project_name}

                                        onBlur={(e) =>
                                            searchField("project_name", e.target.value)}
                                        onKeyPress={(e) => onKeyPress("project_name", e)} />
</TableHeader>
                                    <TableHeader><TextInput
                                        className="w-full"
                                        placeholder="Task Name"
                                        defaultValue={queryParams.name}

                                        onBlur={(e) =>
                                            searchField("task_name", e.target.value)}
                                        onKeyPress={(e) => onKeyPress("name", e)} />

                                    </TableHeader>
                                    <TableHeader>
                                        <SelectInput className="w-full"
                                            defaultValue={queryParams.status}
                                            onChange={(e) => searchField("status", e.target.value)}>

                                            <option value="">Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>

                                        </SelectInput>
                                    </TableHeader>
                                    <TableHeader>
                                        <SelectInput className="w-full"
                                            defaultValue={queryParams.priority}
                                            onChange={(e) => searchField("priority", e.target.value)}>

                                            <option value="">Select Priority</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>

                                        </SelectInput>
                                    </TableHeader>
                                    <TableHeader></TableHeader>
                                    <TableHeader></TableHeader>
                                    <TableHeader ></TableHeader>
                                    <TableHeader ></TableHeader>
                                </tr>
                            </thead>

                            <tbody>
                                {tasks.data.map((task) => (
                                    <tr key={task.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"                                    >
                                        <TableData>{task.id}</TableData>
                                        <TableData>
                                            <img src={task.image_path} alt="" style={{ width: 60 }} />
                                        </TableData>
                                        <TableData> {task.project_id.name}</TableData>
                                        <TableData>{task.task_name}</TableData>
                                        <TableData>
                                            <div className={"rounded text-white px-2 py-1 text-center " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </div>

                                        </TableData>

                                        <TableData>
                                        <div className={"rounded text-white px-2 py-1 text-center " +TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </div>

                                        </TableData>

                                        <TableData>{task.created_at}</TableData>
                                        <TableData>{task.created_by.name}</TableData>
                                        <TableData>{task.due_date}</TableData>
                                        <TableData>
                                            <Link
                                                href={route("task.edit", task.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>

                                            <Link href={route("task.destroy", task.id)}
                                                className="font-medium text-red--600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </Link>
                                        </TableData>
                                    </tr>
                                )
                                )}


                            </tbody>

                        </table>
                        <Pagination links={tasks.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

}