export default (due) => {
    if (!due) return null;
    let now_moment = moment();
    let due_moment = moment(due);
    let days       = due_moment.businessDiff(now_moment);
    return (days >= 0 && days <= 10 ? 'in ' + Math.floor(days) + ' weekdays' : due_moment.fromNow());
};