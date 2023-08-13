'use client'
import { CustomError } from "@/components/customError";

/**
 * error.js automatically creates an React Error Boundary
 * that wraps a nested child segment or page.js component.
 * The React component exported from the error.js file is used as the fallback component.
 * If an error is thrown within the error boundary, the error is contained, and the fallback component is rendered.
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling#how-errorjs-works
 */
 
export default function Error({
  error
}: {
  error: Error
}) {
  return (
    <CustomError
      errorMessage="We are having trouble searching the Github API or loading your saved repositories."
      resolutionMessage="Try reloading the page."
    ></CustomError>
  )
}