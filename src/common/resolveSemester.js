export function resolveSemester(group) {
    return group.semesters.filter(s => s.year === group.activeYear && s.semester === group.activeSemester)[0]
}