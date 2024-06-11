
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableData from "@/Components/TableData";
import TableHeader from "@/Components/TableHeader";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
export default function Index({ auth, projects , queryParams = null}) {
    queryParams = queryParams||{};

    const searchField = (fieldName , value) =>{
        if(value){
            queryParams[fieldName] = value;
        }else{
            delete queryParams[fieldName];
        }
        router.get(route('project.index'),queryParams);
    }
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
    
        searchFieldChanged(name, e.target.value);
      };
    
    
    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
    >
        <Head title="Projects" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100 snap-mandatory snap-x">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <TableHeader>Id</TableHeader>
                                    <TableHeader>Image</TableHeader>
                                    <TableHeader>Name</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                    <TableHeader>Created At</TableHeader>
                                    <TableHeader>Created By</TableHeader>
                                    <TableHeader>Due Date</TableHeader>
                                    <TableHeader >Actions</TableHeader>
                                </tr>
                            </thead> 

                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <TableHeader></TableHeader>
                                    <TableHeader></TableHeader>
                                    <TableHeader><TextInput className = "w-full" placeholder ="Project Name" onBlur={(e) => searchField("name", e.target.value)} onKeyPress={(e) => onKeyPress("name", e)}></TextInput>
                          
                                    </TableHeader>
                                    <TableHeader>
                                        <SelectInput className = "w-full"
                                        onChange={(e)=>searchField("status",e.target.value)}>
                                        
                                        <option value ="">Select Status</option>
                                        <option value ="pending">Pending</option>
                                        <option value = "in_progress">In Progress</option>
                                        <option value ="completed">Completed</option>
                                        
                                    </SelectInput>
                                    </TableHeader>
                                    <TableHeader> </TableHeader>
                                    <TableHeader></TableHeader>
                                    <TableHeader></TableHeader>
                                    <TableHeader ></TableHeader>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.data.map((project) => (
                                    <tr key={project.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"                                    >
                                        <TableData>{project.id}</TableData>
                                        <TableData>
                                            <img src={project.image_path} alt="" style={{ width: 60 }} />
                                        </TableData>
                                        <TableData>{project.name}</TableData>
                                        <TableData>
                                            <div className= {"rounded text-white px-2 py-1 text-center "+PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </div>
                                            </TableData>
                                        <TableData>{project.created_at}</TableData>
                                        <TableData>{project.created_by.name}</TableData>
                                        <TableData>{project.due_date}</TableData>
                                        <TableData>
                                            <Link
                                                href={route("project.edit", project.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>

                                            <Link href={route("project.destroy", project.id)}
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
                        <Pagination links={projects.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

}