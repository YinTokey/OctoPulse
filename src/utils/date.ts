export function formatUpdatedAt(dateString: string): string {
    const updatedDate = new Date(dateString);
    const now = new Date();

    // Calculate the difference in time (milliseconds)
    const diffTime = now.getTime() - updatedDate.getTime();
    // Convert to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "today";
    } else {
        return `${diffDays} days ago`;
    }
}