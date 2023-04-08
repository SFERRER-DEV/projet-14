import { useState, useEffect } from 'react';

/**
 * Hook personnalisé qui récupère une liste de données depuis une URL d'API JSON et renvoie les paires clé-valeur spécifiées sous forme d'objet.
 * @param {string} jsonUrl - L'URL de l'API JSON à partir de laquelle récupérer les données.
 * @returns {object} Un objet contenant les variables suivantes :
 * - jsonData : les données JSON récupérées depuis une API.
 * - setJsonData : une fonction pour mettre à jour les données JSON.
 * - isDataLoading : un indicateur booléen pour indiquer si les données sont en cours de chargement.
 * - setDataLoading : une fonction pour mettre à jour l'indicateur de chargement des données.
 * - error : une erreur éventuelle survenue lors du chargement des données.
 * - setError : une fonction pour mettre à jour l'erreur éventuelle.
 */
export function useFetchList(jsonUrl) {
  /**
   * Etat des données chargées à partir du fichier json
   * @typedef jsonData - Tableau d'objets json contenant les éléments pour la liste
   * @typedef setJsonData - Fonction qui permet de mettre à jour le tableau de données.
   */
  const [jsonData, setJsonData] = useState(null);

  /**
   * État de chargement indiquant si les données sont en cours de chargement ou non.
   * @typedef isDataLoading - Indique si les données sont en cours de chargement ou non.
   * @typedef setDataLoading - Fonction qui permet de mettre à jour l'état de chargement de données.
   */
  const [isDataLoading, setDataLoading] = useState(false);

  /**
   * État d'erreur.
   * @typedef error - Indique s'il y a une erreur ou non.
   * @typedef setError - Fonction qui permet de mettre à jour l'état d'erreur.
   */
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData(jsonUrl) {
      setDataLoading(true); // Indiquer que les données sont en cours de chargement
      try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Le tableau d'éléments n'a pas été trouvé.");
        }
        setJsonData(data); // ✅ Mettre à jour les données JSON dans l'état
      } catch (err) {
        console.log(err);
        setError(true); // ⛔ Indiquer qu'une erreur s'est produite lors de la récupération des données
      } finally {
        setDataLoading(false); // 👍 Indiquer que les données ne sont plus en cours de chargement
      }
    }
    //
    fetchData(jsonUrl);
  }, [jsonUrl]);

  return {
    jsonData,
    setJsonData,
    isDataLoading,
    setDataLoading,
    error,
    setError,
  };
}
