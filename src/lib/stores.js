import { get, writable } from "svelte/store";
import { getAllRestaurants, getFilteredRestaurants, getRestrantCount, getReviewsOfRestaurant } from "./firestore";


function makeUpdater(store) {
    return (snapshot) => {
        let list = get(store);

        if (!snapshot.size) {
            list = [];
        } else {
            snapshot.docChanges().forEach(function(change) {
                const id = change.doc.id;
                const found = list.findIndex(doc => doc.id === id);
                if (change.type === 'removed') {
                    list.splice(found, 1);
                } else {
                    if (found >= 0) {
                        list[found] = change.doc;
                    } else {
                        list.push(change.doc);
                    }
                }
            });
        }

        store.set(list);
    };
}

export function getRestaurants(filters) {
    const store = writable([]);
    const updater = makeUpdater(store);

    if (filters.city || filters.category || filters.price || filters.sort !== 'Rating' ) {
        getFilteredRestaurants({
            city: filters.city || 'Any',
            category: filters.category || 'Any',
            price: filters.price || 'Any',
            sort: filters.sort
        }, updater);
    } else {
        getAllRestaurants(updater);
    }
    
    return { subscribe: store.subscribe };
}

export function getReviews(doc) {
    const store = writable([]);
    const updater = makeUpdater(store);

    getReviewsOfRestaurant(doc, updater);
    
    return { subscribe: store.subscribe };
}

export function restrantIsEmpty() {
    const store = writable(undefined);
    getRestrantCount(count => store.set(!count));
    return { subscribe: store.subscribe };
}
