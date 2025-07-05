import { Button, Input, Paper } from "@mui/material"

export const AddProduct = () => {
  return (
    <div className="z-2">
        <Paper className="p-6">
            <div className="text-gray-600">Add Product</div>
            <div className="mt-5 flex flex-col gap-6">
                <Input placeholder="Product name"/>
                <Input placeholder="Description"/>
                <Input placeholder="Price"/>
                <Button variant="contained">Add</Button>
            </div>
        </Paper>
    </div>
  )
}
