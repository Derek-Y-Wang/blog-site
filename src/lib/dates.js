// Frontmatter dates like `date: 2026-11-16` can arrive as a Date object
// (YAML parses them) or as a string. Normalize to "YYYY-MM-DD".
export function isoDate(date) {
	if (!date) return '';
	return (date instanceof Date ? date.toISOString() : String(date)).slice(0, 10);
}

// "November 16, 2026", without timezone drift.
export function formatDate(date) {
	const iso = isoDate(date);
	if (!iso) return '';
	return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
