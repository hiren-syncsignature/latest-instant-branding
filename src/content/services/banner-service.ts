/**
 * Banner Service
 * Manages the lifecycle and state of the banner preview
 */

import { BannerManager } from '../content-components';
import { store } from '../../store';

// Constants
const LINKEDIN_BANNER_SELECTOR = "div.top-card-background-hero-image";

/**
 * Banner Service Class
 * Singleton service that manages the banner preview
 */
export class BannerService {
    private static instance: BannerService;
    private bannerManager: BannerManager | null = null;
    private bannerElement: HTMLElement | null = null;
    private storeUnsubscribe: (() => void) | null = null;

    /**
     * Get singleton instance
     */
    public static getInstance(): BannerService {
        if (!BannerService.instance) {
            BannerService.instance = new BannerService();
        }
        return BannerService.instance;
    }

    /**
     * Private constructor enforces singleton pattern
     */
    private constructor() { }

    /**
     * Initialize banner preview
     * @returns True if initialization was successful
     */
    public initialize(): boolean {
        // Find LinkedIn banner element
        const bannerElement = document.querySelector<HTMLElement>(LINKEDIN_BANNER_SELECTOR);

        if (!bannerElement) {
            console.warn(`Banner element (${LINKEDIN_BANNER_SELECTOR}) not found on this page.`);
            return false;
        }

        this.bannerElement = bannerElement;

        try {
            // Get initial state from store
            const initialState = store.getState().editor;

            // Create banner manager
            this.bannerManager = new BannerManager(bannerElement);

            // Setup banner with initial state
            this.bannerManager.setup(initialState);

            // Subscribe to store updates
            this.storeUnsubscribe = store.subscribe(this.handleStoreUpdate.bind(this));

            console.log("Banner preview initialized successfully");
            return true;
        } catch (error) {
            console.error("Error initializing banner preview:", error);
            this.cleanup();
            return false;
        }
    }

    /**
     * Handle Redux store updates
     */
    private handleStoreUpdate(): void {
        if (!this.bannerManager) return;

        try {
            const currentState = store.getState().editor;
            this.bannerManager.update(currentState);
        } catch (error) {
            console.error("Error updating banner:", error);
        }
    }

    /**
     * Clean up banner preview
     */
    public cleanup(): void {
        // Unsubscribe from store
        if (this.storeUnsubscribe) {
            this.storeUnsubscribe();
            this.storeUnsubscribe = null;
        }

        // Clean up banner manager
        if (this.bannerManager) {
            this.bannerManager.unmount();
            this.bannerManager = null;
        }

        this.bannerElement = null;
    }

    /**
     * Check if banner preview is active
     */
    public isActive(): boolean {
        return this.bannerManager !== null;
    }
}

export default BannerService;