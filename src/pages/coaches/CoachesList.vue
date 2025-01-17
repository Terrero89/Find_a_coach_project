<template>
<div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                <!-- we are going to add a ? a query parameter to show the user in url where we are headed -->
                <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to register as a mentor</base-button>
                <!-- We are only showing register if we are logged in and is not a coach -->
                <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"></coach-item>
            </ul>
            <h3 v-else>No coaches found.</h3>
        </base-card>
    </section>
</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseButton from '../../components/ui/BaseButton.vue';

export default {
    components: {
        CoachItem,
        CoachFilter,
        BaseButton
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            },
        };
    },
    computed: {

        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter((coach) => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        //* load coaches will be false a default so, after a minute or when force refresh is pressed we load coaches.
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                //* this will try to refresh no matter if its been less than a minute ago,.
                await this.$store.dispatch('coaches/loadCoaches', {
                    forceRefresh: refresh
                }); //? refresh is the part provided by load coaches within parenthesis.
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
