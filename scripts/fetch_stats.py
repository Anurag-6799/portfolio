import requests
import json
import re
import os

# Configuration
LEETCODE_USERNAME = "rTEYtXc8k2"
CODEFORCES_HANDLE = "singhanurag6799"
CSES_ID = "392743"
OUTPUT_DIR = "frontend/public/assets"
MANUAL_STATS_FILE = "manual_stats.json"

def fetch_leetcode_stats():
    try:
        url = f"https://leetcode-stats-api.herokuapp.com/{LEETCODE_USERNAME}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        if data.get("status") == "success":
            return data
        return None
    except Exception as e:
        print(f"Error fetching LeetCode stats: {e}")
        return None

def fetch_codeforces_stats():
    stats = {
        "rating": None,
        "maxRating": None,
        "rank": "Unrated",
        "maxRank": "Unrated",
        "solved": 0
    }
    
    # User Info
    try:
        info_url = f"https://codeforces.com/api/user.info?handles={CODEFORCES_HANDLE}"
        info_res = requests.get(info_url, timeout=10)
        info_res.raise_for_status()
        info_data = info_res.json()
        if info_data['status'] == 'OK' and info_data['result']:
            user = info_data['result'][0]
            stats["rating"] = user.get("rating")
            stats["maxRating"] = user.get("maxRating")
            stats["rank"] = user.get("rank", "Unrated")
            stats["maxRank"] = user.get("maxRank", "Unrated")
    except Exception as e:
        print(f"Error fetching CF info: {e}")

    # Solved Count
    try:
        status_url = f"https://codeforces.com/api/user.status?handle={CODEFORCES_HANDLE}&from=1&count=1000"
        status_res = requests.get(status_url, timeout=10)
        status_res.raise_for_status()
        status_data = status_res.json()
        if status_data['status'] == 'OK':
            # Count unique accepted problems
            solved_problems = set()
            for submission in status_data['result']:
                if submission.get("verdict") == "OK":
                    # Create a unique identifier for the problem
                    problem = submission.get("problem", {})
                    # Use composite ID to ensure uniqueness
                    problem_id = f"{problem.get('contestId', '')}{problem.get('index', '')}{problem.get('name', '')}"
                    solved_problems.add(problem_id)
            stats["solved"] = len(solved_problems)
    except Exception as e:
        print(f"Error fetching CF submissions: {e}")

    return stats

def fetch_cses_stats():
    stats = {"solved": 0}
    try:
        url = f"https://cses.fi/user/{CSES_ID}"
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Regex to find "Solved task count"
        # Often it looks like: <tr><td>Solved task count:</td><td>42</td></tr>
        match = re.search(r"Solved task count:</td>\s*<td[^>]*>(\d+)", response.text)
        if match:
            stats["solved"] = int(match.group(1))
        else:
             # Fallback: check for table rows if format changed, or look for pure number near "Solved"
             # Try stricter table cell match
             pass
    except Exception as e:
        print(f"Error fetching CSES stats: {e}")
    
    return stats

def merge_manual_overrides(stats):
    if os.path.exists(MANUAL_STATS_FILE):
        try:
            with open(MANUAL_STATS_FILE, 'r') as f:
                manual = json.load(f)
                
            # Deep merge simple logic
            if "codeforces" in manual:
                for k, v in manual["codeforces"].items():
                    if k in stats["codeforces"]:
                        # Only override if API returned 0 or None, OR just force override?
                        # User wants correction, so force override logic if API is 0
                        if k == "solved" and stats["codeforces"][k] == 0:
                             stats["codeforces"][k] = v
                        elif k != "solved": # For other fields, override
                             stats["codeforces"][k] = v
            
            if "leetcode" in manual:
                 for k, v in manual["leetcode"].items():
                    if k in stats["leetcode"]:
                        stats["leetcode"][k] = v
                        
            if "cses" in manual:
                 for k, v in manual["cses"].items():
                    if k in stats["cses"]:
                        stats["cses"][k] = v
                        
            print("Applied manual overrides.")
        except Exception as e:
            print(f"Error applying manual overrides: {e}")
    return stats

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    lc_data = fetch_leetcode_stats()
    cf_data = fetch_codeforces_stats()
    cses_data = fetch_cses_stats()

    combined_stats = {
        "leetcode": lc_data,
        "codeforces": cf_data,
        "cses": cses_data,
        "lastUpdated": os.popen('date -u +"%Y-%m-%dT%H:%M:%SZ"').read().strip()
    }
    
    combined_stats = merge_manual_overrides(combined_stats)

    with open(f"{OUTPUT_DIR}/competitive-stats.json", "w") as f:
        json.dump(combined_stats, f, indent=2)

    print("Stats updated successfully.")

if __name__ == "__main__":
    main()
