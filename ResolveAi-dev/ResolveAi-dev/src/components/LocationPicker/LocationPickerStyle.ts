import { StyleSheet } from 'react-native';
import { colors } from '../../style/colors';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    useCurrentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    useCurrentText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
    },
    mapContainer: {
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
    },
    map: {
        flex: 1,
    },
    mapFallback: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
    },
    fallbackTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text,
    },
    fallbackText: {
        fontSize: 12,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    hint: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
});
