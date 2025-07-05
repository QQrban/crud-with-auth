import { Button } from "@mui/material";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import { useState } from "react";
import AddProductForm from "../components/AddProductForm";

export const Dashboard = () => {
    const [open, setOpen] = useState(false);

    return (
        <div 
            className="
            min-h-full 
            absolute 
            flex
            items-center
            "
        >
            <AddProductForm
                open={open}
                setOpen={setOpen}
            />
            <SideBar/>
                <div className="flex flex-col gap-3">
                    <div className="self-end">
                        <Button 
                            variant="contained"
                            onClick={() => setOpen(true)}
                        >
                            Add Product
                        </Button>
                    </div>
                    <DataTable/>
                </div>
        </div>
    )
}
