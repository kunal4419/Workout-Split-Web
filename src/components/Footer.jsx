export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full py-4 bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-600 dark:text-gray-300 flex flex-col items-center gap-2">
      <span>&copy; {new Date().getFullYear()} PPL Workout Split made by Kunal Patel. All rights reserved.</span>
    </footer>
  );
}
