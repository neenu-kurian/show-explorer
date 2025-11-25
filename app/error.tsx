"use client"

import { ErrorProps } from "./types";

const ErrorPage = ({error, reset}: ErrorProps) => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={()=> reset()}>Try again</button>
    </div>
  )
}

export default ErrorPage;