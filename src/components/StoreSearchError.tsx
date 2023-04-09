import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import { useRouter } from "next/router";
import Link from "next/link";
import CenteredCardWrapper from "./CentredCardWrapper";

export default function StoreSearchError() {
  const router = useRouter();
  return (
    <CenteredCardWrapper>
      <h2>Sorry, an error occured searching your stores</h2>
      <h3>Why does this occur?</h3>
      <p>
        Currently, there are limitations on which stores can be searched. Please
        check that the store(s) searched matches the following criteria:
      </p>
      <ul className="list-inside list-disc">
        <li>The store must be a Shopify store</li>
        <li>The store must be accessible to the public</li>
        <li>The store's search page must be accessible at /search</li>
        <li>
          The store's search results page must list products with links
          containing either &apos;product&apos;, &apos;?_pos=&apos; or
          &apos;?variant=&apos;
        </li>
      </ul>
      <div className="mt-10">
        <Link href={`/discover/select-stores?q=${router.query.q}`}>
          <Button>
            <div className="flex items-center justify-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Go back</span>
            </div>
          </Button>
        </Link>
      </div>
    </CenteredCardWrapper>
  );
}