import { useEffect } from "react"


// const getRepoCards
export const SummaryStats = () => {
  useEffect(() => {
    document.querySelectorAll('.repo-card');
    console.log('SummaryStats mounted')
  }, []);


  // $$('[data-additions]').map(el => parseInt(el.getAttribute('data-additions'))).reduce((a,b) => a + b, 0)

}