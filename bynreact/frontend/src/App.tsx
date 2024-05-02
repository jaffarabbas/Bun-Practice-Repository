import { useState } from 'react'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import './App.css'

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  return (
    <>
      {/* <div className="flex flex-col bg-background max-w-md m-auto gap-y-5">
        <Button onClick={() => setCount((count) => count + 1)}>Up</Button>
        <Button onClick={() => setCount((count) => count - 1)}>Down</Button>
      </div> */}

      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>
            Total amount spent on expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {totalSpent}
        </CardContent>
      </Card>
    </>
  );
}

export default App
